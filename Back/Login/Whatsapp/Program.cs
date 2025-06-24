using System.Text.Json;
using Confluent.Kafka;
using dotenv.net;
using Microsoft.AspNetCore.Builder;
using Whatsapp.Config;
using Whatsapp.Models;
using Whatsapp.Services;
using Whatsapp.Services.Implementations;
using Microsoft.AspNetCore.Http;

DotEnv.Load();
var config = AppConfig.LoadFromEnvironment();

// Initialize services
var notificationService = new SocketNotificationService(config.MessagesUsersUrl);
var whatsappService = new TwilioWhatsappService(config);
var codeStorageService = new RedisCodeStorageService(config.RedisConnection);
var verificationService = new VerificationService(whatsappService, codeStorageService, notificationService);

// Initialize notification service
await notificationService.Initialize();

// Configure web server for webhooks
var builder = WebApplication.CreateBuilder();
var app = builder.Build();

app.MapPost("/", async (HttpRequest request) =>
{
    var form = await request.ReadFormAsync();
    var toPhone = form["To"].ToString();
    var messageStatus = form["MessageStatus"];
    Console.WriteLine($"📡 Webhook received - phone: {toPhone}, Status: {messageStatus}");
    return Results.Ok();
});

var serverTask = app.RunAsync("http://localhost:4002");

// Configure Kafka consumer
var consumerConfig = new ConsumerConfig
{
    BootstrapServers = config.KafkaServer,
    GroupId = "verification-group",
    AutoOffsetReset = AutoOffsetReset.Earliest,
    EnableAutoCommit = false
};

using var consumer = new ConsumerBuilder<Ignore, string>(consumerConfig).Build();
consumer.Subscribe("Verification");

Console.WriteLine("⏳ Waiting for messages in topic 'Verification'...");

var cts = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) =>
{
    e.Cancel = true;
    cts.Cancel();
};

try
{
    while (!cts.Token.IsCancellationRequested)
    {
        var cr = consumer.Consume(cts.Token);
        var msg = JsonSerializer.Deserialize<VerificationMessage>(cr.Message.Value)!;

        await verificationService.ProcessVerificationMessageAsync(msg);
        consumer.Commit(cr);
    }
}
finally
{
    consumer.Close();
}

await serverTask;
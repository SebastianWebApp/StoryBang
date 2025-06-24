namespace Whatsapp.Config
{
    public class AppConfig
    {
        public string AccountSid { get; set; }
        public string AuthToken { get; set; }
        public string WhatsappFrom { get; set; }
        public string MessagesUsersUrl { get; set; }
        public string RedisConnection { get; set; }
        public string KafkaServer { get; set; }
        public string WebhookUrl { get; set; }

        public static AppConfig LoadFromEnvironment()
        {
            return new AppConfig
            {
                AccountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID")!,
                AuthToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN")!,
                WhatsappFrom = Environment.GetEnvironmentVariable("TWILIO_WHATSAPP_FROM")!,
                MessagesUsersUrl = Environment.GetEnvironmentVariable("PORT_MESSAGES_USERS")!,
                RedisConnection = Environment.GetEnvironmentVariable("PORT_DB_CODE")!,
                KafkaServer = Environment.GetEnvironmentVariable("KAFKA_PORT")!,
                WebhookUrl = Environment.GetEnvironmentVariable("WEBHOOK")!
            };
        }
    }
}
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Whatsapp.Config;
using Whatsapp.Services.Interfaces;

namespace Whatsapp.Services.Implementations
{
    public class TwilioWhatsappService : IWhatsappService
    {
        private readonly string _whatsappFrom;
        private readonly string _webhookUrl;

        public TwilioWhatsappService(AppConfig config)
        {
            TwilioClient.Init(config.AccountSid, config.AuthToken);
            _whatsappFrom = config.WhatsappFrom;
            _webhookUrl = config.WebhookUrl;
        }

        public async Task SendVerificationCodeAsync(string phone, string code)
        {
            var cleanedPhone = phone.StartsWith("0") ? phone.Substring(1) : phone;
            var toPhone = $"whatsapp:+593{cleanedPhone}";

            await MessageResource.CreateAsync(
                body: $"🔒 Your verification code is: {code}",
                from: new PhoneNumber(_whatsappFrom),
                to: new PhoneNumber(toPhone),
                statusCallback: new Uri(_webhookUrl)
            );
        }
    }
}
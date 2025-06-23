using Whatsapp.Models;
using Whatsapp.Services.Interfaces;

namespace Whatsapp.Services
{
    public class VerificationService
    {
        private readonly IWhatsappService _whatsappService;
        private readonly ICodeStorageService _codeStorageService;
        private readonly INotificationService _notificationService;

        public VerificationService(
            IWhatsappService whatsappService,
            ICodeStorageService codeStorageService,
            INotificationService notificationService)
        {
            _whatsappService = whatsappService;
            _codeStorageService = codeStorageService;
            _notificationService = notificationService;
        }

        public async Task ProcessVerificationMessageAsync(VerificationMessage message)
        {
            try
            {
                var code = Guid.NewGuid().ToString("N").Substring(0, 6).ToUpper();
                
                await _whatsappService.SendVerificationCodeAsync(message.Phone, code);
                await _codeStorageService.StoreCodeAsync(message.Id, code, TimeSpan.FromMinutes(5));
                await _notificationService.SendNotificationAsync(
                    message.Id,
                    true,
                    "The verification code has been sent");

                Console.WriteLine($"The verification code has been sent to phone: {message.Phone}");
            }
            catch (Exception ex)
            {
                await _notificationService.SendNotificationAsync(
                    message.Id,
                    false,
                    "Communication server error");
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
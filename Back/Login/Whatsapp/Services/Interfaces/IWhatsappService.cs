namespace Whatsapp.Services.Interfaces
{
    public interface IWhatsappService
    {
        Task SendVerificationCodeAsync(string phone, string code);
    }
}
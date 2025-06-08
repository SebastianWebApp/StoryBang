namespace Whatsapp.Services.Interfaces
{
    public interface INotificationService
    {
        Task SendNotificationAsync(string id, bool status, string message);
    }
}
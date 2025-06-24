namespace Whatsapp.Services.Interfaces
{
    public interface ICodeStorageService
    {
        Task StoreCodeAsync(string id, string code, TimeSpan expiry);
    }
}
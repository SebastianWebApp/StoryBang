using SocketIOClient;
using Whatsapp.Services.Interfaces;

namespace Whatsapp.Services.Implementations
{
    public class SocketNotificationService : INotificationService
    {
        private readonly SocketIOClient.SocketIO _socket;

public SocketNotificationService(string serverUrl)
{
    _socket = new SocketIOClient.SocketIO(serverUrl, new SocketIOClient.SocketIOOptions
    {
        Reconnection = true,
        ReconnectionAttempts = int.MaxValue,
        ReconnectionDelay = 3000
    });
}

        public async Task Initialize()
        {
            await _socket.ConnectAsync();
        }

        public async Task SendNotificationAsync(string id, bool status, string message)
        {
            while (!_socket.Connected)
            {
                Console.WriteLine("Waiting for Socket.IO to connect...");
                await Task.Delay(3000);
            }

            await _socket.EmitAsync("Profile", new
            {
                Id = id + "_Verification",
                Status = status,
                Message = message
            });
        }
    }
}
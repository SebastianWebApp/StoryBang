using StackExchange.Redis;
using Whatsapp.Services.Interfaces;

namespace Whatsapp.Services.Implementations
{
    public class RedisCodeStorageService : ICodeStorageService
    {
        private readonly IDatabase _database;

        public RedisCodeStorageService(string connectionString)
        {
            var redis = ConnectionMultiplexer.Connect(connectionString);
            _database = redis.GetDatabase();
        }

        public async Task StoreCodeAsync(string id, string code, TimeSpan expiry)
        {
            await _database.StringSetAsync(id, code, expiry);
        }
    }
}
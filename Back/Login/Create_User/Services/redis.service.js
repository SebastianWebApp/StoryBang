export class RedisService {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    async connect() {
        if (!this.redisClient.isOpen) {
            try {
                await this.redisClient.connect();
                console.log("Connected to Redis");
            } catch (error) {
                console.log("Retrying database connection...");
                await new Promise(resolve => setTimeout(resolve, 10000));
                await this.connect();
            }
        }
    }

    async getValue(key) {
        return await this.redisClient.get(key);
    }

    async deleteValue(key) {
        return await this.redisClient.del(key);
    }
}
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisOptions = {
    host: process.env.BULL_USERS_HOST,
    port: process.env.BULL_USERS_PORT
};

export const createRedisClient = () => {
    return createClient({ url: process.env.PORT_DB_CODE });
};
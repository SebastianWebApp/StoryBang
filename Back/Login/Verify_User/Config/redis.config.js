import dotenv from "dotenv";

dotenv.config();

export const redisConfig = {
    host: process.env.BULL_USERS_HOST,
    port: process.env.BULL_USERS_PORT
};
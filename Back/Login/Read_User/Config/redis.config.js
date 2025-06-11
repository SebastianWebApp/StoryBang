import dotenv from "dotenv";

dotenv.config();

export const redisOptions = {
    host: process.env.BULL_USERS_HOST,
    port: process.env.BULL_USERS_PORT
};
import dotenv from "dotenv";

dotenv.config();

export const redisOptions = {
    host: process.env.BULL_STORY_HOST,
    port: process.env.BULL_STORY_PORT
};
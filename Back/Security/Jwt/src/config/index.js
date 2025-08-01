import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
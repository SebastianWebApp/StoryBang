import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import Test_Connection from "./Controllers/test_connection.js";
import { redisConfig } from "./Config/redis.config.js";
import { VerificationService } from "./Services/verification.service.js";
import {JWTService} from "./Services/jwt.service.js";
import { NotificationService } from "./Services/notification.service.js";

dotenv.config();
const PORT = process.env.PORT;
Test_Connection();

const app = express();

// Initialize verification queue
const verifyUserQueue = new Queue("Verify_User", { redis: redisConfig });
const jwtService = new JWTService();

// Process verification jobs
verifyUserQueue.process(async (job) => {
    // Verify JWT Token        
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            await NotificationService.sendNotification(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }
    await VerificationService.verifyUser(job.data);
});

app.listen(PORT, () => {
    console.log(`Server Active http://localhost:${PORT}`);
});
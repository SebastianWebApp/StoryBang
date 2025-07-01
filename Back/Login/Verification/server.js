import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import Test_Connection from "./Controllers/test_connection.js";
import { redisConfig } from "./Config/redis.config.js";
import { TOPIC } from "./Config/kafka.config.js";
import { KafkaService } from "./Services/kafka.service.js";
import { VerificationService } from "./Services/verification.service.js";
import {JWTService} from "./Services/jwt.service.js";
import { NotificationService } from "./Services/notification.service.js";
import logger from "./Services/logs.service.js";

dotenv.config();
const PORT = process.env.PORT;

Test_Connection();

const app = express();

// Initialize Kafka topic
await KafkaService.createTopicIfNotExists(TOPIC);
const jwtService = new JWTService();

// Initialize verification queue
const verificationQueue = new Queue("Verification", { redis: redisConfig });

// Process verification jobs
verificationQueue.process(5, async (job) => {
    // Verify JWT Token        
    logger.info(`Processing job: ${job.data}`);
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            logger.warn(`Invalid token for user ID: ${job.data.Id}`);
            await NotificationService.sendNotification(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }
    logger.info(`Verification: ${job.data}`);
    await VerificationService.processVerification(job.data);
});

app.listen(PORT, () => {
    logger.info(`Server Active http://localhost:${PORT}`);
    console.log(`Server Active http://localhost:${PORT}`);
});
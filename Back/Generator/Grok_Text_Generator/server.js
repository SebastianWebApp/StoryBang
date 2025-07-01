import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import { redisOptions } from "./Config/redis.config.js";
import { NotificationService } from "./Services/notification.service.js";
import {JWTService} from "./Services/jwt.service.js";
import {GROKService} from "./Services/grok.service.js";
import logger from "./Services/logs.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;


const app = express();
const socket = io(PORT_MESSAGES_USERS);
const notificationService = new NotificationService(socket);
const jwtService = new JWTService();
const grokService = new GROKService();




const Text_GeneratorQueue = new Queue("Grok_Text_Generator", { redis: redisOptions });

Text_GeneratorQueue.process(5, async (job) => {
    try {    
        // Verify JWT Token  
        logger.info(`Processing job: ${job.data}`);      
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            logger.warn(`Invalid token for user ID: ${job.data.Id}`);
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }

        const Content = await grokService.GenerateText(job.data.Prompt, job.data.Audience);

        // Send Text
        logger.info(`Grok_Text_Generator: ${job.data.Id, true, Content}`);
        await notificationService.notify(job.data.Id, true, Content);

    } catch (error) {
        logger.error(`Unhandled error processing job for user ID ${job.data.Id}: ${error.message}`);
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    logger.info(`Server Active http://localhost:${PORT}`);
    console.log(`Server Active http://localhost:${PORT}`);
});
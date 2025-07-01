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


const Image_GeneratorQueue = new Queue("Grok_Image_Generator", { redis: redisOptions });

Image_GeneratorQueue.process(5, async (job) => {
    
    try {  
        logger.info(`Processing job: ${JSON.stringify(job.data)}`);
        // Verify JWT Token        
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            logger.warn(`Invalid token for user ID: ${job.data.Id}`);
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.", job.data.Number);
            return;
        }

        // Generate Image
        const Image = await grokService.ImageGrok(job.data.Prompt);

        // Send Image
        logger.info(`Grok_Image_Generator: ${job.data.Id, true, "data:image/jpeg;base64,"+Image, job.data.Number}`);
        await notificationService.notify(job.data.Id, true, "data:image/jpeg;base64,"+Image, job.data.Number);

    } catch (error) {   
        logger.error(`Unhandled error processing job for user ID ${job.data.Id}: ${error.message}`);  
        await notificationService.notify(job.data.Id, false, "Error processing job", job.data.Number);
    }
});

app.listen(PORT, () => {
    logger.info(`Server Active http://localhost:${PORT}`);
    console.log(`Server Active http://localhost:${PORT}`);
});
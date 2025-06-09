import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import { redisOptions } from "./Config/redis.config.js";
import { NotificationService } from "./Services/notification.service.js";
import {JWTService} from "./Services/jwt.service.js";
import {GROKService} from "./Services/grok.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;


const app = express();
const socket = io(PORT_MESSAGES_USERS);
const notificationService = new NotificationService(socket);
const jwtService = new JWTService();
const grokService = new GROKService();


const Image_GeneratorQueue = new Queue("Grok_Image_Generator", { redis: redisOptions });

Image_GeneratorQueue.process(async (job) => {
    try {    
        // Verify JWT Token        
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }

        // Generate Image
        const Image = await grokService.ImageGrok(job.data.Prompt);

        // Send Image
        await notificationService.notify(job.data.Id, true, "data:image/jpeg;base64,"+Image);

    } catch (error) {
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    console.log(`Server Active http://localhost:${PORT}`);
});
import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import Test_Connection from "./Controllers/test_connection.js";
import connectToDB from "./Database/connect.js";
import { redisOptions } from "./Config/redis.config.js";
import { NotificationService } from "./Services/notification.service.js";
import { UserService } from "./Services/user.service.js";
import {JWTService} from "./Services/jwt.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;

Test_Connection();

const app = express();
const socket = io(PORT_MESSAGES_USERS);
const notificationService = new NotificationService(socket);
const userService = new UserService(connectToDB);
const jwtService = new JWTService();

// Create Delete User Queue
const DeleteUserQueue = new Queue("Delete_User", { redis: redisOptions });

DeleteUserQueue.process(async (job) => {
    try {    
        // Verify JWT Token        
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }
        await userService.deleteUser(job.data.Id);
        await notificationService.notify(job.data.Id, true, "Successfully deleted");    
    } catch (error) {
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    console.log(`Server Active http://localhost:${PORT}`);
});
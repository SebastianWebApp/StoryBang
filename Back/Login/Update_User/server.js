import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import Test_Connection from "./Controllers/test_connection.js";
import connectToDB from "./Database/connect.js";
import { redisOptions } from "./Config/redis.config.js";
import { NotificationService } from "./Services/notification.service.js";
import { UserService } from "./Services/user.service.js";
import { EncryptionService } from "./Services/encryption.service.js";
import {JWTService} from "./Services/jwt.service.js";
import logger from "./Services/logs.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;

Test_Connection();

const app = express();

// Inicializar servicios
const socket = io(PORT_MESSAGES_USERS);
const notificationService = new NotificationService(socket);
const userService = new UserService(connectToDB);
const encryptionService = new EncryptionService(process.env.PORT_ENCRYPT);
const jwtService = new JWTService();

// Configurar cola de actualización de usuario
const UpdateUserQueue = new Queue("Update_User", { redis: redisOptions });

UpdateUserQueue.process(5, async (job) => {
    try {
        // Verify JWT Token  
        logger.info(`Processing job: ${job.data}`);      
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            logger.warn(`Invalid token for user ID: ${job.data.Id}`);
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }
        try {
            const { encryptedPhone, encryptedPassword } = await encryptionService.encrypt(
                job.data.Phone,
                job.data.Password
            );

            await userService.updateUser(
                job.data.Id,
                encryptedPhone,
                encryptedPassword,
                job.data.Username,
                job.data.Image
            );

            logger.info(`User updated successfully: ${job.data}`);
            await notificationService.notify(job.data.Id, true, "User updated successfully");
        } catch (error) {
            logger.error(`Error encrypting your credentials. Please try again. ${job.data.Id}: ${error.message}`);
            await notificationService.notify(
                job.data.Id,
                false,
                "Error encrypting your credentials. Please try again."
            );
        }
    } catch (error) {
        logger.error(`Unhandled error processing job for user ID ${job.data.Id}: ${error.message}`);
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    logger.info(`Server Active http://localhost:${PORT}`);
    console.log(`Server Active http://localhost:${PORT}`);
});
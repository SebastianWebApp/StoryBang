import express, { json } from "express";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import Queue from "bull";
import Test_Connection from "./Controllers/test_connection.js";
import connectToDB from "./Database/connect.js";
import { redisOptions } from "./Config/redis.config.js";
import { twilioConfig, createTwilioClient } from "./Config/twilio.config.js";
import { NotificationService } from "./Services/notification.service.js";
import { UserService } from "./Services/user.service.js";
import { DecryptionService } from "./Services/decryption.service.js";
import { WhatsappService } from "./Services/whatsapp.service.js";
import {JWTService} from "./Services/jwt.service.js";
import logger from "./Services/logs.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;

Test_Connection();

const app = express();
app.use(json());

// Inicializar servicios
const socket = io(PORT_MESSAGES_USERS);
const twilioClient = createTwilioClient();
const notificationService = new NotificationService(socket);
const userService = new UserService(connectToDB);
const decryptionService = new DecryptionService(process.env.PORT_DECRYPT);
const whatsappService = new WhatsappService(twilioClient, twilioConfig.whatsappFrom);
const jwtService = new JWTService();

// Configurar cola de recuperación de contraseña
const RecoverPasswordQueue = new Queue("Recover_Password", { redis: redisOptions });

RecoverPasswordQueue.process(5, async (job) => {
    try {    
        // Verify JWT Token 
        logger.info(`Processing job: ${job.data}`);       
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            logger.warn(`Invalid token for user ID: ${job.data.Id}`);
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }
        const users = await userService.findUserById(job.data.Id);

        if (users.length > 0) {
            try {
                const decryptedData = await decryptionService.decrypt(
                    users[0].Phone,
                    users[0].Password
                );
                
                await whatsappService.sendPassword(
                    decryptedData.data.decrypt.phone,
                    decryptedData.data.decrypt.password
                );
                logger.info(`Password sent: ${job.data.Id, true}`);
                await notificationService.notify(job.data.Id, true, "Password sent");
            } catch (error) {
                logger.error(`Error decrypting your information: ${job.data.Id}: ${error.message}`);
                await notificationService.notify(job.data.Id, false, "Error decrypting your information");
            }
        } else {
            logger.error(`The user does not exist: ${job.data.Id}: ${error.message}`);
            await notificationService.notify(job.data.Id, false, "The user does not exist");
        }
    } catch (error) {
        logger.error(`Error processing job: ${job.data.Id}: ${error.message}`);
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    logger.info(`Server Active http://localhost:${PORT}`);
    console.log(`Active Messaging in http://localhost:${PORT}`);
});
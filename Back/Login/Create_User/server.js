import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import Test_Connection from "./Controllers/test_connection.js";
import connectToDB from "./Database/connect.js";
import { redisOptions, createRedisClient } from "./Config/redis.config.js";
import { RedisService } from "./Services/redis.service.js";
import { EncryptionService } from "./Services/encryption.service.js";
import { NotificationService } from "./Services/notification.service.js";
import { UserService } from "./Services/user.service.js";
import {JWTService} from "./Services/jwt.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;

Test_Connection();

const app = express();
const redisClient = createRedisClient();
const redisService = new RedisService(redisClient);
const encryptionService = new EncryptionService(process.env.PORT_ENCRYPT);
const socket = io(PORT_MESSAGES_USERS);
const notificationService = new NotificationService(socket);
const userService = new UserService(connectToDB);
const jwtService = new JWTService();

// Connect to Redis
redisService.connect();

// Create User Queue Processing
const CreateUserQueue = new Queue("Create_User", { redis: redisOptions });

CreateUserQueue.process(5, async (job) => {
    try {
console.log("1")
        // Verify JWT Token        
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
            await notificationService.notify(job.data.Id, false, "Session expired. Please log in again.");
            return;
        }
console.log("2")
        const code = await redisService.getValue(job.data.Id);

        if (code === job.data.Code) {
            try {
                const { encryptedPhone, encryptedPassword } = await encryptionService.encrypt(
                    job.data.Phone,
                    job.data.Password
                );

                console.log("3")
                await userService.createUser(
                    job.data.Id,
                    encryptedPhone,
                    encryptedPassword,
                    job.data.Username,
                    job.data.Image
                );
                console.log("4")
                await redisService.deleteValue(job.data.Id);
                await notificationService.notify(job.data.Id, true, "User created successfully");
            } catch (error) {
                console.log(error)
                await notificationService.notify(job.data.Id, false, "Error encrypting your credentials. Please try again.");
            }
        } else {
            await notificationService.notify(job.data.Id, false, "The verification code is incorrect");
        }
    } catch (error) {
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    console.log(`Server Active http://localhost:${PORT}`);
});
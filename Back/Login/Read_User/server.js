import express from "express";
import Queue from "bull";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import Test_Connection from "./Controllers/test_connection.js";
import connectToDB from "./Database/connect.js";
import { redisOptions } from "./Config/redis.config.js";
import { NotificationService } from "./Services/notification.service.js";
import { UserService } from "./Services/user.service.js";
import { DecryptionService } from "./Services/decryption.service.js";
import { UserMapper } from "./Services/user.mapper.js";
import {JWTService} from "./Services/jwt.service.js";

dotenv.config();
const PORT = process.env.PORT;
const PORT_MESSAGES_USERS = process.env.PORT_MESSAGES_USERS;

Test_Connection();

const app = express();

// Inicializar servicios
const socket = io(PORT_MESSAGES_USERS);
const notificationService = new NotificationService(socket);
const userService = new UserService(connectToDB);
const decryptionService = new DecryptionService(process.env.PORT_DECRYPT);
const jwtService = new JWTService();


import { io } from "socket.io-client";



socket.on("connect", () => {
  console.log("Conectado al servidor");
  socket.emit("joinRoom", "testRoom");
  socket.emit("Profile", { Id: "testRoom", Message: "Hola", Status: true });
});

socket.on("Profile_Response", (data) => {
  console.log("Respuesta recibida:", data);
});

socket.on("connect_error", (err) => {
  console.error("Error de conexión:", err);
});



// Configurar cola de lectura de usuario
const ReadUserQueue = new Queue("Read_User", { redis: redisOptions });

ReadUserQueue.process(async (job) => {
    try {    
        
        // Verify JWT Token        
        const isValidToken = await jwtService.verifyToken(job.data.Token);
        if (!isValidToken) {
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

                const userProfile = UserMapper.toUserProfile(users[0], decryptedData);
                await notificationService.notify(job.data.Id, true, userProfile);
            } catch (error) {
                await notificationService.notify(job.data.Id, false, "Error decrypting your information");
            }
        } else {
            await notificationService.notify(job.data.Id, false, "The user does not exist");
        }
    } catch (error) {
        await notificationService.notify(job.data.Id, false, "Error processing job");
    }
});

app.listen(PORT, () => {
    console.log(`Server Active http://localhost:${PORT}`);
});
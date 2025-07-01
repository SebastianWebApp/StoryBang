import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import logger from "./Services/logs.service.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e9, // 1 GB
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});        

 io.on("connection", (socket) => {
     socket.on("joinRoom", (room) => socket.join(room));
     socket.on("Profile", ({ Id, Message, Status, Number }) => {
        io.to(Id).emit("Profile_Response", { Message, Status, Number });
        logger.info(`Profile_Response: ${Message, Status, Number}`);
     });
 });

 server.listen(process.env.PORT, () => {
    logger.info(`Server Active http://localhost:${process.env.PORT}`);
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
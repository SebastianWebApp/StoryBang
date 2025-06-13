import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e9, // 1 GB
    cors: {
        origin: ["*"], 
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});        

 io.on("connection", (socket) => {
     socket.on("joinRoom", (room) => socket.join(room));
     socket.on("Profile", ({ Id, Message, Status }) => {
        io.to(Id).emit("Profile_Response", { Message, Status });
     });
 });

 server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
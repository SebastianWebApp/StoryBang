import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

// Configuración simple del servidor
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    }
});

// Manejo simple de eventos de Socket.IO
io.on("connection", (socket) => {
    // Unirse a una sala
    socket.on("joinRoom", (room) => socket.join(room));

    // Enviar mensaje a una sala
    socket.on("Profile", ({ Id, Message, Status }) => {
        socket.broadcast.to(Id).emit("Profile_Response", { Message, Status });
    });
});

// Iniciar servidor
server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
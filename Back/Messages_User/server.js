// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//     maxHttpBufferSize: 50 * 1024 * 1024, // 5 MB limit for messages (adjust according to needs)
//     cors: {
//         origin: ["*"], 
//         methods: ["GET", "POST"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//         credentials: true
//     }
// });        

//  io.on("connection", (socket) => {
//      socket.on("joinRoom", (room) => socket.join(room));
//      socket.on("Profile", ({ Id, Message, Status }) => {
//          io.to(Id).emit("Profile_Response", { Message, Status });
//      });
//  });

//  server.listen(process.env.PORT, () => {
//     console.log(`Server running at http://localhost:${process.env.PORT}`);
// });



import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 50 * 1024 * 1024, // 5 MB limit for messages (adjust according to needs)
    cors: {
        origin: ["*"], 
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});        

io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on("joinRoom", (room) => socket.join(room));

    socket.on("Profile", ({ Id, Message, Status }) => {
        io.to(Id).emit("Profile_Response", { Message, Status });
    });

    socket.on("disconnect", (reason) => {
        console.log(`Usuario desconectado: ${socket.id} - Razón: ${reason}`);
        // Aquí puedes manejar limpieza si es necesario
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

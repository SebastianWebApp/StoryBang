// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import dotenv from "dotenv";
// import logger from "./Services/logs.service.js";

import express from "express";
import { createServer } from "https";
import { Server } from "socket.io";
import dotenv from "dotenv";
import fs from "fs";
import logger from "./Services/logs.service.js";



dotenv.config();

const app = express();
// const server = createServer(app);


// Cargar los certificados SSL
const privateKey = fs.readFileSync("ruta/a/tu/private.pem", "utf8");
const certificate = fs.readFileSync("ruta/a/tu/cert.pem", "utf8");

const credentials = { key: privateKey, cert: certificate };

const server = createServer(credentials, app); // ahora HTTPS

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
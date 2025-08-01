import express, { json } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath, pathToFileURL } from "url";
import timeout from 'connect-timeout';
import { JWT } from "./Services/read_jwt.js";
import router_create_account from "./Routers/routers_create_account.js";
import router_generator from "./Routers/routers_generator.js";
import router_character from "./Routers/routers_character.js";
import router_story from "./Routers/routers_story.js";

import https from "https";
import fs from "fs";


// Enable connection with the .env file
dotenv.config();
const PORT = process.env.PORT;

// Get the path of the elements
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const privateKey = fs.readFileSync(path.join(__dirname, "private.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "public.pem"), "utf8");
const credentials = { key: privateKey, cert: certificate };


// Initialize express
const app = express();



// Middlewares
app.use(cors()); // Allows connection between Front and Backend
app.use(json({ limit: "10mb" })); // Parse JSON in requests
app.use(cookieParser()); // To parse cookies
app.use("/api/router_generator/Translate", timeout('10m'));
app.use("/api/router_generator/Gpt2Medium_Text_Generator", timeout('10m'));
app.use("/api/router_generator/Gpt2_Text_Generator", timeout('10m'));

// Serve static files based on the route
app.use(express.static(path.join(__dirname)));

// ---------------------- Login ------------------------------

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/create_account", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "create_account.html"));
});

app.get("/verification_code", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "verification_code.html"));
});

app.get("/forgot_password", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "forgot_password.html"));
});



// ------------------------ Home ---------------------------------------
app.get("/home",JWT, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/user_profile",JWT, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "user_profile.html"));
});

app.get("/character_creator",JWT , (req, res) => {
    res.sendFile(path.join(__dirname, "views", "character_creator.html"));
});

app.get("/story_creator",JWT, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "story_creator.html"));
});

app.get("/wait",JWT, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "wait.html"));
});

app.get("/story",JWT, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "story.html"));
});
app.get("/list",JWT, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "list.html"));
});


// ---------------------- Expired Session ------------------------------

app.get("/expired_session", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "expired_session.html"));
});


// // ---------------------- Gateway ------------------------------
app.use("/api/create_account", router_create_account);
app.use("/api/router_generator",JWT, router_generator);
app.use("/api/router_character",JWT, router_character);
app.use("/api/router_story",JWT, router_story);

app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
        res.status(400).json({
            Status: false,
            Response: "Incorrect API address"
        });
    } else {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html")); // Path to the 404.html file
    }
});

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server Active http://localhost:${PORT}`);
// });

// Start HTTPS Server
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`HTTPS Server Active at https://localhost:${PORT}`);
});
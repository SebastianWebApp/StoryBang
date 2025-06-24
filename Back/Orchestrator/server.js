import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import router_create_account from "./Routers/routers_create_account.js";


// Enable connection with the .env file
dotenv.config();
const PORT = process.env.PORT;



// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(json({ limit: "10mb" })); // Parse JSON in requests



// // ---------------------- Gateway ------------------------------
app.use("/api/create_account", router_create_account);


app.use((req, res) => {
    res.status(400).json({
        Status: false,
        Response: "Incorrect API address"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server Active http://localhost:${PORT}`);
});
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Test_Connection from "./Controllers/test_connection.js";

dotenv.config();

Test_Connection();

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(cors());

app.use(json());

app.use((req, res) => {
    res.status(404).json({
        Status: false,
        Response: "Resource not found"
    });
});


// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server Active http://localhost:${PORT}`);
    });
}
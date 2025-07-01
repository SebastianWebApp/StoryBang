import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwtRoutes from "./routes/jwtRoutes.js";
import { CORS_ORIGIN } from "./config/index.js";

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = CORS_ORIGIN.split(',');
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(JSON.stringify({
      Status: false,
      Response: "Origin not allowed by CORS"
    })), false);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(jwtRoutes);

app.use((req, res) => {
  res.status(404).json({
    Status: false,
    Response: "Resource not found"
  });
});

export default app;
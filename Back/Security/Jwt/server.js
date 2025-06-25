import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN.split(',');


    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = {
        Status: false,
        Response: "Origin not allowed by CORS"
      };
      return callback(new Error(JSON.stringify(msg)), false);
    }
  },
  credentials: true
}));





app.use(express.json());
app.use(cookieParser());

// Create token JWT
app.post('/Create_Jwt', (req, res) => {
    const { Id } = req.body;
    
    if (!Id) {
        return res.status(400).json({
            Status: false,
            Response: "ID es requerido"
        });
    }

    try {
        const token = jwt.sign({ Id }, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({
            Status: true,
            Response: "Security created successfully",
            Content: token
        });
    } catch (error) {
        res.status(500).json({
            Status: false,
            Response: "Error al crear token"
        });
    }
});

// Verification token JWT
app.post('/Verify_Jwt', (req, res) => {
    const { Token } = req.body;
    
    if (!Token) {
        return res.status(401).json({
            Status: false,
            Response: "Session expired. Please log in again."
        });
    }

    try {
        const decoded = jwt.verify(Token, JWT_SECRET_KEY);
        res.json({
            Status: true,
            Response: "Valid token",
            Id: decoded
        });
    } catch (error) {
        res.status(401).json({
            Status: false,
            Response: "Invalid token or session expired. Please log in again."
        });
    }
});

// Manejo de rutas no encontradas
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


// Export the app for testing purposes
export default app;
import Queue from "bull";
import dotenv from "dotenv";
import Security_JWT from "../Services/create_jwt.js";

dotenv.config();

const redisOptions = {
    host: process.env.BULL_USERS_HOST,
    port: process.env.BULL_USERS_PORT
};


export const Recover_Password = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }
        const Recover_PasswordQueue = new Queue("Recover_Password", { redis: redisOptions });

        const job = await Recover_PasswordQueue.add(
            {
                Id: req.body.Id,
                Token: Security.Response            
            },
            {
                attempts: 1,           // Retry up to 1 times in case of failure
                // backoff: 2000,         // Wait 2 seconds between attempts
                removeOnComplete: true, // Remove completed job from Redis
                removeOnFail: true      // Remove job that exceeds attempts and fails
            }
        );

        res.status(200).json({
            Response: "Please wait a moment",
            Status: true
        });

        return;
        
    } catch (error) {
        res.status(500).json({
            Response: "Failed to add job to queue. Please try again later.",
            Status: false
        });
    }
    
};




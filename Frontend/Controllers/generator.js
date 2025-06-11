import Queue from "bull";
import dotenv from "dotenv";
import Security_JWT from "../Services/create_jwt.js";

dotenv.config();

const redisOptions = {
    host: process.env.BULL_GENERATOR_HOST,
    port: process.env.BULL_GENERATOR_PORT
};


export const Grok_Description_Image = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        // Create a new queue for verification
        const GeneratorQueue = new Queue("Grok_Description_Image", { redis: redisOptions });

        const job = await GeneratorQueue.add(
            {
                Id: req.body.Id,
                Prompt: req.body.Prompt,
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

export const Grok_Image_Generator = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        // Create a new queue for verification
        const GeneratorQueue = new Queue("Grok_Image_Generator", { redis: redisOptions });

        const job = await GeneratorQueue.add(
            {
                Id: req.body.Id,
                Prompt: req.body.Prompt,
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

export const Grok_Text_Generator = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        // Create a new queue for verification
        const GeneratorQueue = new Queue("Grok_Text_Generator", { redis: redisOptions });

        const job = await GeneratorQueue.add(
            {
                Id: req.body.Id,
                Prompt: req.body.Prompt,
                Token: Security.Response,
                Tokens: req.body.Tokens,
                Temperature: req.body.Temperature,
                Top_p: req.body.Top_p,
                Presence_penalty: req.body.Presence_penalty,
                Frequency_penalty: req.body.Frequency_penalty
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
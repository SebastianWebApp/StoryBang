import Queue from "bull";
import dotenv from "dotenv";
import Security_JWT from "../Services/create_jwt.js";

dotenv.config();

const redisOptions = {
    host: process.env.BULL_CHARACTER_HOST,
    port: process.env.BULL_CHARACTER_PORT
};


export const Create_Character = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        const ProcessQueue = new Queue("Create_Character", { redis: redisOptions });

        const job = await ProcessQueue.add(
            {
                Id: req.body.Id,
                Token: Security.Response,
                Name: req.body.Name,
                Description: req.body.Description,
                Image: req.body.Image
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

export const Delete_Character = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        const ProcessQueue = new Queue("Delete_Character", { redis: redisOptions });

        const job = await ProcessQueue.add(
            {
                Id: req.body.Id,
                Token: Security.Response,
                Id_Character: req.body.Id_Character
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


export const Read_Character = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        const ProcessQueue = new Queue("Read_Character", { redis: redisOptions });

        const job = await ProcessQueue.add(
            {
                Id: req.body.Id,
                Token: Security.Response,
                Filter: req.body.Filter
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


export const Read_Id_Character = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        const ProcessQueue = new Queue("Read_Id_Character", { redis: redisOptions });

        const job = await ProcessQueue.add(
            {
                Id: req.body.Id,
                Token: Security.Response,
                Id_Character: req.body.Id_Character
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


export const Update_Character = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        const ProcessQueue = new Queue("Update_Character", { redis: redisOptions });

        const job = await ProcessQueue.add(
            {
                Id: req.body.Id,
                Token: Security.Response,
                Id_Character: req.body.Id_Character,
                Name: req.body.Name,
                Description: req.body.Description,
                Image: req.body.Image
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
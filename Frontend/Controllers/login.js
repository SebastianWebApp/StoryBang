import Queue from "bull";
import dotenv from "dotenv";
import Security_JWT from "../Services/create_jwt.js";

dotenv.config();

const redisOptions = {
    host: process.env.BULL_USERS_HOST,
    port: process.env.BULL_USERS_PORT
};


export const Verification = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }

        // Create a new queue for verification
        const verificationQueue = new Queue("Verification", { redis: redisOptions });

        const job = await verificationQueue.add(
            {
                Id: req.body.Id,
                Phone: req.body.Phone,
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


export const Create_User = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }
        const Create_UserQueue = new Queue("Create_User", { redis: redisOptions });

        const job = await Create_UserQueue.add(
            {
                Id: req.body.Id,
                Username: req.body.Username,
                Phone: req.body.Phone,
                Image: req.body.Image,
                Password: req.body.Password,
                Code: req.body.Code,
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

export const Read_User = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }
        const Read_UserQueue = new Queue("Read_User", { redis: redisOptions });

        const job = await Read_UserQueue.add(
            {
                Id: req.body.Id ,
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


export const Update_User = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }
        const Update_UserQueue = new Queue("Update_User", { redis: redisOptions });

        const job = await Update_UserQueue.add(
            {
                Id: req.body.Id,
                Username: req.body.Username,
                Phone: req.body.Phone,
                Image: req.body.Image,
                Password: req.body.Password,
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


export const Delete_User = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }
        const Delete_UserQueue = new Queue("Delete_User", { redis: redisOptions });

        const job = await Delete_UserQueue.add(
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


export const Verify_User = async (req, res) => {

    try {

        var Security = await Security_JWT(req, res);
        if (!Security.Status) { 
            return res.status(400).json({
                Response: "Failed to create security. Please try again.",
                Status: false
            });
        }
        const Verify_UserQueue = new Queue("Verify_User", { redis: redisOptions });

        const job = await Verify_UserQueue.add(
            {
                Id: req.body.Id,               
                Password: req.body.Password,
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

export const JWT = async (req, res) => {

    const Security = await Security_JWT(req, res);
    if (Security.Status) {

        res.cookie("Id", Security.Response, {
            httpOnly: true, // Makes the cookie inaccessible from browser JavaScript
            secure: false, // With true,whitepaper With false, it is sent over HTTP
            maxAge: 3600000 // Cookie is valid for 1 hour
        });

        res.status(200).json({
            Status: true,
            Response: "Security has been created successfully"
        });
    } else {
        res.status(400).json({
            Status: false,
            Response: "Failed to create security. Please try again."
        });
    }
}



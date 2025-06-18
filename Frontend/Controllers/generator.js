import Queue from "bull";
import dotenv from "dotenv";
import Security_JWT from "../Services/create_jwt.js";
import GPT2 from "../Services/api_gpt2.js";

dotenv.config();

const redisOptions = {
    host: process.env.BULL_GENERATOR_HOST,
    port: process.env.BULL_GENERATOR_PORT
};
var API_TRANSLATOR = process.env.API_TRANSLATOR;

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
                Audience: req.body.Audience
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

export const Gpt2_Text_Generator = async (req, res) => {

    var Text_Generator = await GPT2(req, res);
    if (Text_Generator.Status) { 
        return res.status(200).json({
            Response: Text_Generator.Response,
            Status: true
        });
    }
    else{
        return res.status(400).json({
            Response: Text_Generator.Response,
            Status: false
        });
    }


}

export const Translate = async (req, res) => {

    try {
        const request = await fetch(API_TRANSLATOR + `/translate`, {
            method: "POST", // Changed to POST
            headers: {
                "Content-Type": "application/json" // Specify that the data is in JSON format
            },
            body: JSON.stringify({
                Text: req.body.Text,
                Tgt_lang: req.body.Tgt_lang
            })
        });

        const serverResponse = await request.json();

        if (serverResponse.Status) {
            res.status(200).json({
                Status: true,
                Response: serverResponse.Content
            });
            
        } else {
            res.status(400).json({
                Status: false,
                Response: "Error generating story, please try again."
            });
            
        }
    } catch (error) {        
        res.status(400).json({
            Status: false,
            Response: "Error generating story, please try again."
        });
    }
}
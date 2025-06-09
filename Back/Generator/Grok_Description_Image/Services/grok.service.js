import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

const API_GROK = process.env.API_GROK;

export class GROKService {   
  
    async Description_Image(prompt) {
            
        const client = new OpenAI({
            baseURL: 'https://api.x.ai/v1',
            apiKey: API_GROK
        });
        
        const messages = [
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: prompt,
                            detail: "high",
                        },
                    },
                    {
                        type: "text",
                        text: "Describe a person in detail, focusing especially on their facial features. Include characteristics such as face shape, eye color and type, nose shape, lips, eyebrows, skin tone, and any distinctive features (such as freckles, scars, or common expressions). If relevant, also mention hair (color, texture, length) and general complexion. Make sure the description is vivid, accurate, and evokes a clear image of the person.",
                    },
                ],
            },
        ];
        
        const completion = await client.chat.completions.create({
            model: "grok-2-vision-latest",
            messages: messages,
            temperature: 0.01,
        });
        
        return completion.choices[0].message.content;                    
    }
}
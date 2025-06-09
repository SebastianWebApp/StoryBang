import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

const API_GROK = process.env.API_GROK;

export class GROKService {   
   
    async GenerateText(prompt) {
        const client = new OpenAI({
            baseURL: 'https://api.x.ai/v1',
            apiKey: API_GROK
        });

        const response = await client.chat.completions.create({
            model: 'grok-3', // Model for text
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000 // Adjust as necessary
        });

        const generatedText = response.choices[0].message.content;
        return generatedText;
    }

}
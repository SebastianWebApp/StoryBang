import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

const API_GROK = process.env.API_GROK;

export class GROKService {   
   
    async GenerateText(prompt, audience) {
        const client = new OpenAI({
            baseURL: 'https://api.x.ai/v1',
            apiKey: API_GROK
        });

        var response;

        if(audience == "children"){

            response = await client.chat.completions.create({
                model: 'grok-3', // Model for text
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000, // Adjust as necessary
                temperature: 1, // Adjust as necessary
                top_p: 0.9, // Adjust as necessary
                presence_penalty: 0.2, // Adjust as necessary
                frequency_penalty: 0.2 // Adjust as necessary
            });

        }
        else if(audience == "young"){

            response = await client.chat.completions.create({
                model: 'grok-3', // Model for text
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000, // Adjust as necessary
                temperature: 0.7, // Adjust as necessary
                top_p: 0.7, // Adjust as necessary
                presence_penalty: 0.3, // Adjust as necessary
                frequency_penalty: 0.3 // Adjust as necessary
            });
        }
        else{

            response = await client.chat.completions.create({
                model: 'grok-3', // Model for text
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000, // Adjust as necessary
                temperature: 0.3, // Adjust as necessary
                top_p: 0.5, // Adjust as necessary
                presence_penalty: 0.5, // Adjust as necessary
                frequency_penalty: 0.5 // Adjust as necessary
            });
        }       

        const generatedText = response.choices[0].message.content;
        return generatedText;
    }

}
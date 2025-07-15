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
        let systemPrompt = "";


        if (audience === "children") {
            systemPrompt = `
            You are a playful and creative children's storyteller. Your job is to write fun, imaginative, and easy-to-understand stories for kids.

            Follow these rules:
            - Use [Title]: at the beginning to show the title of the story.
            - Use [Content]: before each paragraph.
            - Keep language simple, clear, and age-appropriate.
            - Include values and morals in a fun and subtle way.
            - The story must have a beginning, middle, and end.
            - Each paragraph should be a readable chunk of around 100 tokens.
            - Use friendly tone, vivid characters, and magical or real-world adventures kids would enjoy.
            - Each paragraph should include descriptions or actions of **no more than 2 main characters** to keep the story focused and easy to follow.
            - All stories must be written in English, regardless of the language used in user instructions.            
            - Do not explain or repeat the instructions. Just return the formatted story.
            `;
        } else if (audience === "young") {
            systemPrompt = `
        You are a skilled storyteller for teenagers and young readers. Your goal is to create relatable, modern, and engaging stories for a young audience.

        Follow these rules:
        - Use [Title]: at the beginning to show the title of the story.
        - Use [Content]: before each paragraph.
        - Use clear and modern language, but avoid slang unless contextually appropriate.
        - Include challenges, personal growth, emotions, or social issues that young people may connect with.
        - The story must have a beginning, middle, and end.
        - Each paragraph should be a readable chunk of around 100 tokens.
        - Respect any values, genre, characters, and additional instructions provided.
        - Each paragraph should include descriptions or actions of **no more than 2 main characters** to keep the story focused and easy to follow.
        - All stories must be written in English, regardless of the language used in user instructions.
        - Return only the formatted story without explanations.
        `;
        } else {
            // Default system prompt for general/adult audience
            systemPrompt = `
        You are an expert story generator for a general audience. Your goal is to write thoughtful, structured, and complete stories that follow a literary format.

        Follow these rules:
        - Use [Title]: at the beginning to show the title of the story.
        - Use [Content]: before each paragraph.
        - Each paragraph must be around 100 tokens and form a coherent reading block.
        - Ensure a strong structure: beginning, middle, and end.
        - Adapt tone and complexity to an adult or general audience.
        - Integrate the given characters, values, genre, gender orientation, and follow any additional instructions.
        - Each paragraph should include descriptions or actions of **no more than 2 main characters** to keep the story focused and easy to follow.
        - All stories must be written in English, regardless of the language used in user instructions.
        - Do not repeat or explain the prompt — output only the formatted story.
        `;
        }


        if(audience == "children"){

            response = await client.chat.completions.create({
                model: 'grok-3', // Model for text
                messages: [
                    { role: 'system', content: systemPrompt },
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
                    { role: 'system', content: systemPrompt },
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
                    { role: 'system', content: systemPrompt },
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
import dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

var API_GROK = process.env.API_GROK;

export class GROKService {   
    async ImageGrok(Image) {

        let imagenReducida = Image.length > 700 ? Image.slice(0, 700) : Image;

        
        const client = new OpenAI({
            baseURL: 'https://api.x.ai/v1',
            apiKey: API_GROK
        });
  
        const response = await client.images.generate({
            model: 'grok-2-image-1212',
            prompt: "Generate an image in the style of Studio Ghibli: soft colors, warm lighting, expressive anime-style eyes, hand-drawn look, and whimsical, gentle atmosphere. "+imagenReducida,
            n: 1 
        });

        const imageUrl = response.data[0].url;
        
        const imageResponse = await fetch(imageUrl);
        const imageArrayBuffer = await imageResponse.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);
        const generatedImageBase64 = imageBuffer.toString('base64');
        return generatedImageBase64;
          
    }
}
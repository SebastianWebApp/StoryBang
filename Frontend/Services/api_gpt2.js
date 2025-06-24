import dotenv from "dotenv";
dotenv.config();

var API_GPT2 = process.env.API_GPT2;

export const GPT2 = async (req, res) => {

    try {
        const request = await fetch(API_GPT2 + `/generate_story`, {
            method: "POST", // Changed to POST
            headers: {
                "Content-Type": "application/json" // Specify that the data is in JSON format
            },
            credentials: "include", // Include cookies in the request
            body: JSON.stringify({
                Prompt: req.body.Prompt
            })
        });

        const serverResponse = await request.json();

        if (serverResponse.Status) {
            return {
                Status: true,
                Response: serverResponse.Content
            };
            
        } else {
            return{
                Status: false,
                Response: "Error generating story, please try again."
            };
            
        }
    } catch (error) {        
        return {
            Status: false,
            Response: "Error generating story, please try again."
        };
    }
}

export default GPT2;
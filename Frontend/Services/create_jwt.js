import dotenv from "dotenv";
dotenv.config();

var API_JWT = process.env.API_JWT;


export const Security_JWT = async (req, res) => {

     console.log('Origin recibido:', API_JWT);  // <--- aquí
    try {
        const request = await fetch(API_JWT + `/Create_Jwt`, {
            method: "POST", // Changed to POST
            headers: {
                "Content-Type": "application/json" // Specify that the data is in JSON format
            },
            credentials: "include", // Include cookies in the request
            body: JSON.stringify({
                Id: req.body.Id
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
                Response: "Failed to create security. Please try again."
            };
            
        }
    } catch (error) {        
        return {
            Status: false,
            Response: "Failed to create security. Please try again."
        };
    }
}

export default Security_JWT;
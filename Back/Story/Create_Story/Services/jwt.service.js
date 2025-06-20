import dotenv from "dotenv";
dotenv.config();

var API_JWT = process.env.API_JWT;


export class JWTService {   
    async verifyToken(token) {
        try {
            const response = await fetch(`${API_JWT}/Verify_Jwt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ Token: token })
            });            
            const data = await response.json();        
            return data.Status;
        } catch (error) {
            console.error("Error verifying JWT:", error);
            return false;
        }
    }
}

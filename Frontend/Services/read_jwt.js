import dotenv from "dotenv";
dotenv.config();

var API_JWT = process.env.API_JWT;


export const JWT = async (req, res, next) => {

    try {
        const request = await fetch(API_JWT + `/Verify_Jwt`, {
            method: "POST", // Changed to POST
            headers: {
                "Content-Type": "application/json" // Specify that the data is in JSON format
            },
            credentials: "include", // Include cookies in the request
            body: JSON.stringify({
                Token: req.cookies.Id
            })
        });

        const serverResponse = await request.json();

        if (serverResponse.Status) {
            // Si el token es válido, pasar al siguiente middleware o ruta
            return next();
        } else {
           return res.redirect('/expired_session');
        }
    } catch (error) {
        return res.redirect('/expired_session');
    }
}

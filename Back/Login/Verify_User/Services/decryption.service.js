import dotenv from "dotenv";

dotenv.config();

export class DecryptionService {
    static async decryptData(phone, password) {
        const response = await fetch(process.env.PORT_DECRYPT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    mutation Decrypt($phone: String!, $password: String!) {
                        decrypt(phone: $phone, password: $password) {
                        phone
                        password
                        }
                    }
                    `,
                variables: {
                    phone,
                    password
                }
            })
        });

        return await response.json();
    }
}
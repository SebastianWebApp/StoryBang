export class DecryptionService {
    constructor(decryptUrl) {
        this.decryptUrl = decryptUrl;
    }

    async decrypt(phone, password) {
        const response = await fetch(this.decryptUrl, {
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

        return response.json();
    }
}
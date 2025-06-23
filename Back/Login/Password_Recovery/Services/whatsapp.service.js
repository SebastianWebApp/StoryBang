export class WhatsappService {
    constructor(twilioClient, whatsappFrom) {
        this.twilioClient = twilioClient;
        this.whatsappFrom = whatsappFrom;
    }

    async sendPassword(phone, password) {
        return await this.twilioClient.messages.create({
            from: this.whatsappFrom,
            body: `Your password is: ${password}`,
            to: `whatsapp:+593${phone.slice(1)}`
        });
    }
}
export class WhatsappService {
    constructor(twilioClient, whatsappFrom) {
        this.twilioClient = twilioClient;
        this.whatsappFrom = whatsappFrom;
    }

    async sendMessage(message, phone) {
        return await this.twilioClient.messages.create({
            from: this.whatsappFrom,
            body: message,
            to: `whatsapp:+593${phone.slice(1)}`
        });
    }
}
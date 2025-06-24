import connectToDB from "../Database/connect.js";
import { NotificationService } from "./notification.service.js";
import { KafkaService } from "./kafka.service.js";

export class VerificationService {
    static async processVerification(data) {
        try {    
            const [rows] = await connectToDB.query("CALL ReadRecord(?)", [data.Id]);

            if (rows[0].length > 0) {
                await NotificationService.sendNotification(data.Id, false, "User exists");
            } else {
                await KafkaService.sendMessage({ Id: data.Id, Phone: data.Phone });
            }
        } catch (error) {
            await NotificationService.sendNotification(data.Id, false, "Error processing job");
        }
    }
}
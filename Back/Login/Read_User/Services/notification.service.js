import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();
const socket = io(process.env.PORT_MESSAGES_USERS);

export class NotificationService {
    static async sendNotification(Id_User, Status, Message) {
        try {
            socket.emit('Profile', {
                Id: Id_User+"_Read_User",
                Status: Status,
                Message: Message
            });
        } catch (error) {
            console.log("Communication server error");
        }
    }
}
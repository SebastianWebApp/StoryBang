export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message, number) {
        try {
            this.socket.emit("Profile", {
                Id: userId + "_Grok_Image_Generator",
                Status: status,
                Message: message,
                Number: number
            });
        } catch (error) {
            console.log("Communication server error");
        }
    }
}
export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message) {
        try {
            this.socket.emit("Profile", {
                Id: userId + "_Delete_Character",
                Status: status,
                Message: message
            });
        } catch (error) {
            console.log("Communication server error");
        }
    }
}
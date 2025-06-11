export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message) {
        try {
            this.socket.emit("Profile", {
                Id: userId + "_Update_User",
                Status: status,
                Message: message
            });
        } catch (error) {
            console.log("Communication server error");
        }
    }
}
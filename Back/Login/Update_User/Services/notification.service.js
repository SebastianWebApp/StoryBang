export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message) {
        try {
            this.socket.emit('joinRoom', userId + "_Update_User");
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
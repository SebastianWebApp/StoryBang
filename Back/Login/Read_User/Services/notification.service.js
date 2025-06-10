export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message) {
        console.log("User Profile:", userId);

        try {
            this.socket.emit('Profile', {
                Id: userId + "_Read_User",
                Status: status,
                Message: message
            });
        } catch (error) {
            console.log("Communication server error");
                    console.log("User Profile:");

        }
    }
}
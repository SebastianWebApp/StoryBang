export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message) {
        try {

            this.socket.emit('joinRoom', userId + "_Recover_Password");

            this.socket.emit('Profile', {
                Id: userId + "_Recover_Password",
                Status: status,
                Message: message
            });
        } catch (error) {
            console.log("Communication server error");
        }
    }
}
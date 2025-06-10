export class NotificationService {
    constructor(socket) {
        this.socket = socket;
    }

    async notify(userId, status, message) {
       

        try {

            if (!this.socket.connected) {
                console.log("Socket no conectado. Intentando reconectar...");
                
                // Intentar reconectar
                await new Promise((resolve, reject) => {
                    this.socket.connect();

                    const timeout = setTimeout(() => {
                        reject(new Error("Tiempo de espera agotado en reconexión"));
                    }, 5000); // 5 segundos

                    this.socket.once("connect", () => {
                        clearTimeout(timeout);
                        console.log("Reconectado exitosamente.");
                        resolve();
                    });

                    this.socket.once("connect_error", (err) => {
                        clearTimeout(timeout);
                        reject(err);
                    });
                });
            }


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
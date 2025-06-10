export class NotificationService {
    constructor(socket) {
        this.socket = socket;
        // Escuchar eventos para monitorear la conexión
        this.socket.on("connect", () => console.log("Socket conectado:", this.socket.id));
        this.socket.on("disconnect", (reason) => console.log("Socket desconectado:", reason));
        this.socket.on("connect_error", (error) => console.error("Error de conexión al servidor de notificaciones:", error));
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

            console.log("Enviando notificación al usuario:", userId, "Estado:", status, "Mensaje:", message);

            this.socket.emit('Profile', {
                Id: userId + "_Read_User",
                Status: status,
                Message: message
            });

            console.log("Notificación enviada correctamente");
        } catch (error) {
            console.log("Communication server error");
                    console.log("User Profile:");

        }
    }
}
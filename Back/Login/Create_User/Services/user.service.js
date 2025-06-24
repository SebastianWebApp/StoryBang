export class UserService {
    constructor(db) {
        this.db = db;
    }

    async createUser(userId, encryptedPhone, encryptedPassword, username, image) {
        return await this.db.query(
            "CALL CreateRecord(?, ?, ?, ?, ?)",
            [userId, encryptedPhone, encryptedPassword, username, image]
        );
    }
}
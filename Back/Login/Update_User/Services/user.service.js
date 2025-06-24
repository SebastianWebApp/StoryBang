export class UserService {
    constructor(db) {
        this.db = db;
    }

    async updateUser(userId, phone, password, username, image) {
        const [rows] = await this.db.query(
            "CALL UpdateRecord(?, ?, ?, ?, ?)",
            [userId, phone, password, username, image]
        );
        return rows;
    }
}
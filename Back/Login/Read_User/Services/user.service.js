export class UserService {
    constructor(db) {
        this.db = db;
    }

    async findUserById(userId) {
        const [rows] = await this.db.query("CALL ReadRecord(?)", [userId]);
        return rows[0];
    }
}
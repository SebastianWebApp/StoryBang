export class UserService {
    constructor(db) {
        this.db = db;
    }

    async deleteUser(userId) {
        const [rows] = await this.db.query("CALL DeleteRecord(?)", [userId]);
        return rows;
    }
}
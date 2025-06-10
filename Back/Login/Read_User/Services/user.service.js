import connectToDB from "../Database/connect.js";

export class UserService {
    static async findUserById(id) {
        const [rows] = await connectToDB.query("CALL ReadRecord(?)", [id]);
        return rows[0];
    }
}
import connectToDB from "../Database/connect.js";
import { InitializeDatabase } from "../Modules/structure.js";
import logger from "../Services/logs.service.js";

async function Test_Connection() {
    try {
        const connection = await connectToDB.getConnection();

        console.log("Successful database connection");
        connection.release(); // Release the connection after use
        logger.info(`Successful database connection`);
        InitializeDatabase();
        logger.info(`Stored procedures created successfully.`);
    } catch (error) {
        console.log("Retrying database connection...");
        logger.error(`Retrying database connection...`);
        // Add a 10-second delay before attempting further action
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Here you could attempt to call `Test_Connection` again or handle retry logic
        await Test_Connection();
    }
}

export default Test_Connection;
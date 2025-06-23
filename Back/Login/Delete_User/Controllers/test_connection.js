import connectToDB from "../Database/connect.js";

async function Test_Connection() {
    try {
        const connection = await connectToDB.getConnection();

        console.log("Successful database connection");
        connection.release(); // Release the connection after use
    } catch (error) {
        console.log("Retrying database connection...");

        // Add a 10-second delay before attempting further action
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Here you could attempt to call `Test_Connection` again or handle retry logic
        await Test_Connection();
    }
}

export default Test_Connection;
import {createPool} from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = createPool({

    host: process.env.MYSQL_HOST,  
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
    
    
});


export default connectToDB;

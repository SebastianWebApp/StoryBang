import connectToDB from "../Database/connect.js";

// Create database
const createDatabase = async () => {
    try {
        // Create the database named StoryBang
        await connectToDB.query("CREATE DATABASE IF NOT EXISTS StoryBang;");
        console.log("StoryBang database created (if it didn't exist)");
    } catch (error) {
        console.error("Error creating the database:", error.message);
    }
};

const createTable = async () => {
    try {
        // Switch to the 'StoryBang' database after creating it
        await connectToDB.query("USE StoryBang;");

        // Create Table
        await connectToDB.query(`CREATE TABLE IF NOT EXISTS Users (
            Id VARCHAR(100) PRIMARY KEY,
            Phone VARCHAR(100) NOT NULL,
            Password VARCHAR(100) NOT NULL,
            Name VARCHAR(100) NOT NULL,
            Image MEDIUMTEXT NOT NULL
        );`);
        console.log("Table 'Users' created (if it didn't exist).");
    } catch (error) {
        console.error("Error creating the table:", error.message);
    }
};

const procedures = async () => {
    try {
        const Read = `
CREATE PROCEDURE ReadRecord(IN inputId VARCHAR(100))
BEGIN
  SELECT 
    Id, 
    Phone, 
    Password, 
    Name,
    Image
  FROM 
    Users 
  WHERE 
    Id = inputId;
END;
`;

        const Create = `
CREATE PROCEDURE CreateRecord(IN inputId VARCHAR(100), IN inputPhone VARCHAR(100), IN inputPassword VARCHAR(100), IN inputName VARCHAR(100), IN inputImage MEDIUMTEXT)
BEGIN
  INSERT INTO Users (Id, Phone, Password, Name, Image)
  VALUES (inputId, inputPhone, inputPassword, inputName, inputImage);
END;
`;

        const Update = `
CREATE PROCEDURE UpdateRecord(
  IN inputId VARCHAR(100),
  IN inputPhone VARCHAR(100),
  IN inputPassword VARCHAR(100),
  IN inputName VARCHAR(100),
  IN inputImage MEDIUMTEXT
)
BEGIN
  UPDATE Users
  SET 
    Phone = inputPhone,
    Password = inputPassword,
    Name = inputName,
    Image = inputImage
  WHERE 
    Id = inputId;
END;
`;

        const Delete = `
CREATE PROCEDURE DeleteRecord(IN inputId VARCHAR(100))
BEGIN
  DELETE FROM Users WHERE Id = inputId;
END;
`;

        // Drop procedures if they already exist
        await connectToDB.query("DROP PROCEDURE IF EXISTS ReadRecord");
        await connectToDB.query("DROP PROCEDURE IF EXISTS CreateRecord");
        await connectToDB.query("DROP PROCEDURE IF EXISTS UpdateRecord");
        await connectToDB.query("DROP PROCEDURE IF EXISTS DeleteRecord");

        await connectToDB.query(Read);
        await connectToDB.query(Create);
        await connectToDB.query(Update);
        await connectToDB.query(Delete);

        console.log("Stored procedures created successfully.");
    } catch (error) {
        console.error("Error creating stored procedures:", error.message);
    }
};

export const InitializeDatabase = async () => {
    await createDatabase();
    await createTable();
    await procedures();
    process.exit(); // This will stop the Node.js process and, consequently, the container
};
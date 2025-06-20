import mongoose from "mongoose";

// Attempt to connect to the database
const connectToDB = async () => {
  await mongoose.connect(process.env.MONGODB).then(res => {
    console.log("Database connected");
  }).catch(async error => {
    console.log("Retrying to connect to the database...");
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds before retrying
    await connectToDB();
  });
};

export default connectToDB;
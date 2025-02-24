import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectToDatabase = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL as string;
    const dbName = process.env.DB_NAME as string;

    if (!dbUrl) throw new Error("DATABASE_URL is not defined in the .env file");

    await mongoose.connect(dbUrl, { dbName });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectToDatabase;

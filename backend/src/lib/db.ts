import mongoose from "mongoose";

// connect to database
export const connectToDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Please provide MONGODB_URI in the environment variables");
    }
    try {
        const db = await mongoose.connect(uri);
        console.log(`Successfully connected to ${db.connection.host}`)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
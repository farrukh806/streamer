import mongoose from "mongoose";
import { env } from "../validations/env";

// connect to database
export const connectToDB = async () => {
    try {
        const db = await mongoose.connect(env.MONGODB_URI);
        console.log(`Successfully connected to ${db.connection.host}`)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
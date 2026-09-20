import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const connectDB = async ()=>{
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.warn("MONGODB_URI is not configured; skipping MongoDB connection.");
        return false;
    }
 
    try {
        await mongoose.connect(mongoUri);
        console.log("db is connected");
        return true;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        return false;
    }
}

export default connectDB;
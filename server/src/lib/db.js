import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);

    console.log(`✔ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(error);
  }
};

import mongoose from "mongoose";
import { ENV } from "./env.js";

const MONGODB_URI = ENV.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI missing");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
      })
      .then((m) => m)
      .catch((e) => {
        new Error("Failed to connect to MongoDB due to", e.message);
        process.exit(1);
      });
  }
  cached.conn = await cached.promise;
  console.log("✔ Connected to MongoDB successfully");
  return cached.conn;
}

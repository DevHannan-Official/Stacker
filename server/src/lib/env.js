import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const issueAuthToken = (userId) => {
  return (
    `Bearer ` + jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: "30d" })
  );
};

export const issueVerifyToken = (userId) => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: "30m" });
};

import nodemailer from "nodemailer";
import { ENV } from "./env.js";

const mailer = nodemailer.createTransport({
  host: ENV.MAIL_HOST,
  port: ENV.MAIL_PORT,
  secure: ENV.MAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASSWORD,
  },
});

export default mailer;

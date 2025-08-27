import { sendVerifyEmail } from "../lib/mails.js";
import mailer from "../lib/nodemailer.js";
import crypto from "crypto";

export const sendVerifyEmail = async (req, res, next) => {
  const user = req.user;
  user.verifyToken = crypto.randomBytes(32).toString("hex");

  await mailer.sendMail({
    to: user.email,
    subject: "Verify Your Account - Stacker",
    text: "Verify Your Account - Stacker",
    html: getVerifyEmailTemplate({
      name: user.name,
      url: `${process.env.CLIENT_URL}/verify?token=${user.verifyToken}`,
    }),
  });

  res
    .status(200)
    .json({ success: true, message: "A mail sent successfully to your inbox" });
};

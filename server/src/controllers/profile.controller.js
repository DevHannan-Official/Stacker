import { ENV } from "../lib/env.js";
import { sendVerifyEmail } from "../lib/mails.js";
import mailer from "../lib/nodemailer.js";
import Otp from "../models/otp.model.js";

export const sendVerifyMail = async (req, res, next) => {
  const user = req.user;
  const otp = Math.round(Math.random() * 1000000);
  await Otp.deleteMany({ userId: user._id });

  await Otp.create({ code: otp, userId: user._id });

  await mailer.sendMail({
    to: user.email,
    subject: "Verify Your Account - Stacker",
    text: "Verify Your Account - Stacker",
    html: sendVerifyEmail({
      appName: ENV.APP_NAME,
      name: user.displayName,
      otp,
    }),
  });

  res
    .status(200)
    .json({ success: true, message: "A mail sent successfully to your inbox" });
};

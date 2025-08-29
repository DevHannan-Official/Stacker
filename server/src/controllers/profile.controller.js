import { ENV } from "../lib/env.js";
import { sendVerifyEmail } from "../lib/mails.js";
import mailer from "../lib/nodemailer.js";
import Otp from "../models/otp.model.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import ErrorHandler from "../lib/error-handler.js";

export const sendVerifyMail = asyncHandler(async (req, res, next) => {
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
      time_limit: "30",
    }),
  });

  res
    .status(200)
    .json({ success: true, message: "A mail sent successfully to your inbox" });
});

export const verifyUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const otp = await Otp.findOne({ userId: user._id });

  if (!otp) {
    next(new ErrorHandler("Invalid or Expired OTP", 400));
    return;
  }

  if (otp.expiredAt < Date.now()) {
    next(new ErrorHandler("Invalid or Expired OTP", 400));
    return;
  }

  if (otp.code !== req.body.code) {
    next(new ErrorHandler("Invalid or Expired OTP", 400));
    return;
  }

  user.verified = true;
  await user.save();
  await Otp.deleteMany({ userId: user._id });

  res.status(200).json({
    success: true,
    message: "Account verified successfully",
  });
});

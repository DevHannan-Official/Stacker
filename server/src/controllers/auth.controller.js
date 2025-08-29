import { asyncHandler } from "../middlewares/error.middleware.js";
import User from "../models/user.model.js";
import ErrorHandler from "../lib/error-handler.js";
import { issueAuthToken, issueVerifyToken } from "../lib/token.js";
import { ENV } from "../lib/env.js";
import { sendResetPasswordMail } from "../lib/mails.js";
import mailer from "../lib/nodemailer.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(new ErrorHandler("Please enter all fields", 400));
    return;
  }

  // Find existing account
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    next(new ErrorHandler("User already exists", 400));
    return;
  }

  const username =
    name
      .split(" ")
      .join("")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "") +
    "-" +
    Math.round(Math.random() * 1000000);

  const user = new User({
    username,
    displayName: name,
    email,
    password,
  });

  await user.save();

  const token = issueAuthToken(user.id);
  res
    .status(201)
    .cookie("authorization", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
    .json({ success: true, user, message: "Signed Up successfully" });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;

  let user;

  if (!email && username) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ email });
  }

  if (!user) {
    next(new ErrorHandler("Please Enter correct credentials", 404));
    return;
  }

  if (!(await user.comparePassword(password))) {
    next(new ErrorHandler("Please Enter correct credentials", 404));
    return;
  }

  const token = issueAuthToken(user.id);
  res
    .status(200)
    .cookie("authorization", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
    .json({ success: true, user, message: "Logged In successfully" });
});

export const authorizeUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email, username } = req.body;

  let user;

  if (!email && !username) {
    next(new ErrorHandler("Email or Username is required", 400));
    return;
  } else if (!email && username) {
    user = await User.findOne({ username });
  } else {
    user = await User.findOne({ email });
  }
  if (!user) {
    next(new ErrorHandler("User not found", 404));
    return;
  } else if (!user.verified) {
    next(new ErrorHandler("Please verify your account first", 400));
    return;
  } else if (user.blocked) {
    next(new ErrorHandler("Your account is blocked", 400));
    return;
  } else if (user.isOAuth.status) {
    next(new ErrorHandler("Cannot reset password for this account", 400));
    return;
  }

  const resetToken = issueVerifyToken(user.id);
  await mailer.sendMail({
    to: user.email,
    subject: "Reset Your Password - Stacker",
    text: "Reset Your Password - Stacker",
    html: sendResetPasswordMail({
      appName: ENV.APP_NAME,
      name: user.displayName,
      url: `${ENV.CLIENT_ORIGIN}/reset-password?token=${resetToken}`,
      time_limit: "30",
    }),
  });

  res
    .status(200)
    .json({ success: true, message: "A mail sent successfully to your inbox" });
});

export const checkToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    next(new ErrorHandler("Invalid or Expired Link", 400));
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      next(new ErrorHandler("Invalid or Expired Link", 400));
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(new ErrorHandler("Invalid or Expired Link", 400));
    return;
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    next(new ErrorHandler("Invalid or Expired Link", 400));
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      next(new ErrorHandler("Invalid or Expired Link", 400));
      return;
    }

    user.password = password;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed" });
  } catch (error) {
    next(new ErrorHandler("Invalid or Expired Link", 400));
    return;
  }
});

export const googleAuthCallback = (req, res) => {
  if (!req.user) {
    return res.redirect(
      `${ENV.CLIENT_ORIGIN}?error=Cannot login with Google, please try again`
    );
  }

  const token = issueAuthToken(req.user.id);

  res
    .cookie("authorization", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
    .redirect(ENV.CLIENT_ORIGIN + "/web");
};

export const githubAuthCallback = (req, res) => {
  if (!req.user) {
    return res.redirect(
      `${ENV.CLIENT_ORIGIN}?error=Cannot login with GitHub, please try again`
    );
  }

  const token = issueAuthToken(req.user.id);
  res
    .cookie("authorization", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
    .redirect(`${ENV.CLIENT_ORIGIN}/web`);
};

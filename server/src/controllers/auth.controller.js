import { asyncHandler } from "../middlewares/error.middleware.js";
import User from "../models/user.model.js";
import ErrorHandler from "../lib/error-handler.js";
import { issueAuthToken } from "../lib/token.js";
import { ENV } from "../lib/env.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

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

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
    name.split(" ").join("").toLowerCase() +
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
    .json({ success: true, user, message: "User signed up successfully" });
});

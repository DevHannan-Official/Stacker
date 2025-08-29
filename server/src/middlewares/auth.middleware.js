import jwt from "jsonwebtoken";
import ErrorHandler from "../lib/error-handler.js";
import User from "../models/user.model.js";
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.authorization;
  if (!token || !token.includes("Bearer")) {
    next(new ErrorHandler("Unauthorized - No Token Provided", 401));
  }
  try {
    token = token.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      next(new ErrorHandler("Unauthorized - Invalid Token", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorHandler("Unauthorized - Invalid or Expired Token", 401));
  }
};

export default authMiddleware;

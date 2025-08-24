import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {
  asyncHandler,
  ErrorMiddleware,
} from "./middlewares/error.middleware.js";
import ErrorHandler from "./lib/error-handler.js";

const app = express();

// Helper Functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Routes
app.get(
  "/",
  asyncHandler(async (req, res, next) => {
    next(new ErrorHandler("Debug Error", 400));
  })
);

// Custom Middlewares
app.use(ErrorMiddleware);

export default app;

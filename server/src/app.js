import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// Helper Functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());
app.use(helmet);

// Routes
app.get("/", (req, res) => {
  res.send("Hello From Stacker Server");
});

// Custom Middlewares
app.use(ErrorMiddleware);

export default app;

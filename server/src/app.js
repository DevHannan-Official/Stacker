import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.route.js";
import chatsRoutes from "./routes/chats.route.js";
import messagesRoutes from "./routes/message.route.js";
import notificationRoutes from "./routes/notification.route.js";
import profileRoutes from "./routes/profile.route.js";

const app = express();

// Helper Functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to **Stacker API**" });
});
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/profile", profileRoutes);

// Custom Middlewares
app.use(ErrorMiddleware);

export default app;

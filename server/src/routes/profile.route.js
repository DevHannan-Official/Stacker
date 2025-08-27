import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { sendVerifyEmail } from "../controllers/profile.controller.js";

const router = Router();

router.get("/verify", authMiddleware, sendVerifyEmail);

export default router;

import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { sendVerifyMail } from "../controllers/profile.controller.js";

const router = Router();

router.get("/verify", authMiddleware, sendVerifyMail);

export default router;

import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  sendVerifyMail,
  verifyUser,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/verify", authMiddleware, sendVerifyMail);

router.patch("/verify", authMiddleware, verifyUser);

export default router;

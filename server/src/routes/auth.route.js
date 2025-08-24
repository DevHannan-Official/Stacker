import { Router } from "express";
import {
  authorizeUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/authorize", authMiddleware, authorizeUser);

export default router;

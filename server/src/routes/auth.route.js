import { Router } from "express";
import {
  authorizeUser,
  checkToken,
  forgetPassword,
  githubAuthCallback,
  googleAuthCallback,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { ENV } from "../lib/env.js";
import passport from "passport";

const router = Router();

// Other routes...
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/authorize", authMiddleware, authorizeUser);
router.post("/forget-password", forgetPassword);
router.get("/check/:token", checkToken);
router.patch("/reset-password/:token", resetPassword);

// Google OAuth initiation route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: ENV.CLIENT_ORIGIN + "?error=Failed to Sign In with Google",
    session: false, // Using JWTs instead of sessions
  }),
  googleAuthCallback
);

// Github OAuth initiation route
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${ENV.CLIENT_ORIGIN}?error=Failed to Sign In with GitHub`,
    session: false,
  }),
  githubAuthCallback
);

export default router;

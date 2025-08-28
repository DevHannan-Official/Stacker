import { Router } from "express";
import {
  authorizeUser,
  githubAuthCallback,
  googleAuthCallback,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { ENV } from "../lib/env.js";
import passport from "passport";

const router = Router();

// Other routes...
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/authorize", authMiddleware, authorizeUser);

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

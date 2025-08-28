import passport from "passport";
import { ENV } from "./env.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        const userExists = !!user;

        if (!userExists) {
          user = new User({
            email: profile.emails[0].value,
            displayName: profile.displayName,
            avatar: { oAuthAvatar: profile.photos[0].value },
            verified: true,
            isOAuth: {
              name: "Google",
              status: true,
            },
            username:
              profile.displayName
                .split(" ")
                .join("")
                .toLowerCase()
                .replace(/[^a-zA-Z0-9 ]/g, "") +
              "-" +
              Math.round(Math.random() * 1000000),
          });
          await user.save();
        } else {
          if (!user.isOAuth.status) {
            return done(
              new Error("User already exists. Cannot login with Google."),
              null
            );
          }
          if (user.avatar.oAuthAvatar !== profile.photos[0].value) {
            user.avatar.oAuthAvatar = profile.photos[0].value;
            await user.save();
          }
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialization and deserialization remain the same
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

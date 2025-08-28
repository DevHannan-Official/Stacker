import passport from "passport";
import { ENV } from "./env.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
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
          if (!user.isOAuth.status || user.isOAuth.name !== "Google") {
            return done(
              new Error(
                `User already exists. Cannot login with Google. Go back to ${ENV.CLIENT_ORIGIN}`
              ),
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

passport.use(
  new GitHubStrategy(
    {
      clientID: ENV.GITHUB_CLIENT_ID,
      clientSecret: ENV.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
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
              name: "GitHub",
              status: true,
            },
            username:
              profile.username ||
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
          if (!user.isOAuth.status || user.isOAuth.name !== "GitHub") {
            return done(
              new Error(
                `User already exists. Cannot login with GitHub. Go back to ${ENV.CLIENT_ORIGIN}`
              ),
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

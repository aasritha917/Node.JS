const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/userModel");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

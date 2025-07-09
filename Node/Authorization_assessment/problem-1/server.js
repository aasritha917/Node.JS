const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("cookie-session");
const jwt = require("jsonwebtoken");
require("./auth/githubStrategy");

require("dotenv").config();
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error", err));

app.use(session({
  name: "github-auth-session",
  keys: ["key1", "key2"]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/auth/github/callback", passport.authenticate("github", { session: false }), (req, res) => {
  const token = jwt.sign(
    { userId: req.user._id, username: req.user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ msg: "Login successful", token });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const TokenBlacklist = require("../models/tokenBlacklistModel");

const router = express.Router();

const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashed, role });
    await user.save();
    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    res.status(400).json({ msg: "Signup failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  const tokens = generateTokens(user);
  res.json(tokens);
});

router.post("/logout", async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  await TokenBlacklist.insertMany([
    { token: accessToken, type: "access" },
    { token: refreshToken, type: "refresh" }
  ]);
  res.json({ msg: "Logged out successfully" });
});

router.post("/refresh", async (req, res) => {
  const { token } = req.body;

  const isBlacklisted = await TokenBlacklist.findOne({ token, type: "refresh" });
  if (isBlacklisted) return res.status(403).json({ msg: "Token blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch {
    res.status(403).json({ msg: "Invalid or expired refresh token" });
  }
});

module.exports = router;

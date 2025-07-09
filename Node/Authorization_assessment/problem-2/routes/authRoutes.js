const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();
const refreshTokens = [];

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
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ msg: "Login failed" });
  }
});

router.post("/refresh", (req, res) => {
  const { token } = req.body;
  if (!refreshTokens.includes(token)) return res.status(403).json({ msg: "Invalid refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ msg: "Refresh token expired" });
  }
});

module.exports = router;

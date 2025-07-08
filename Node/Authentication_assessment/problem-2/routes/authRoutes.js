const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET);
    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
});

module.exports = router;

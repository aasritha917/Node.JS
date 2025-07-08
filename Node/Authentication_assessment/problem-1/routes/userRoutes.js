const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: "Signup successful" });

  } catch (err) {
    res.status(500).json({ msg: "Error during signup", error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET);
    res.json({ msg: "Login successful", token });

  } catch (err) {
    res.status(500).json({ msg: "Error during login", error: err.message });
  }
});
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to protected route", user: req.user });
});

module.exports = router;

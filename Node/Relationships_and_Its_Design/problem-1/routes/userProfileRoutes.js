const express = require("express");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");

const router = express.Router();

router.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/add-profile", async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    const existing = await Profile.findOne({ user });
    if (existing) {
      return res.status(409).json({ message: "Profile already exists for this user" });
    }

    const profile = new Profile({ bio, socialMediaLinks, user });
    await profile.save();
    res.status(201).json({ message: "Profile created", profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

module.exports = router;

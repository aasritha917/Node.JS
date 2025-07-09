const express = require("express");
const Content = require("../models/contentModel");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const User = require("../models/userModel");

const router = express.Router();

router.post("/", auth, isAdmin, async (req, res) => {
  const content = new Content(req.body);
  await content.save();
  res.status(201).json({ msg: "Content created" });
});

router.get("/free", auth, async (req, res) => {
  const data = await Content.find({ type: "free" });
  res.json(data);
});

router.get("/premium", auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!["premium", "pro"].includes(user.subscription.plan))
    return res.status(403).json({ msg: "Upgrade to premium to access" });

  const data = await Content.find({});
  res.json(data);
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ msg: "Content deleted" });
});

module.exports = router;

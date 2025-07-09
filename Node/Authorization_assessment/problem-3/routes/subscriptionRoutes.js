const express = require("express");
const User = require("../models/userModel");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/subscribe", auth, async (req, res) => {
  const { plan } = req.body;
  const validPlans = ["free", "premium", "pro"];
  if (!validPlans.includes(plan)) return res.status(400).json({ msg: "Invalid plan" });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await User.findByIdAndUpdate(req.user.userId, {
    subscription: { plan, expiresAt }
  });

  res.json({ msg: "Subscribed successfully" });
});

router.get("/subscription-status", auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const now = new Date();
  if (user.subscription.expiresAt < now) {
    user.subscription = { plan: "free", expiresAt: null };
    await user.save();
  }

  res.json({ subscription: user.subscription });
});

router.patch("/renew", auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user.subscription.expiresAt) return res.status(400).json({ msg: "No active subscription" });

  const now = new Date();
  if (user.subscription.expiresAt < now) return res.status(400).json({ msg: "Expired. Please resubscribe." });

  user.subscription.expiresAt.setDate(user.subscription.expiresAt.getDate() + 30);
  await user.save();
  res.json({ msg: "Renewed for 30 days" });
});

router.post("/cancel-subscription", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.userId, {
    subscription: { plan: "free", expiresAt: null }
  });
  res.json({ msg: "Subscription cancelled" });
});

module.exports = router;

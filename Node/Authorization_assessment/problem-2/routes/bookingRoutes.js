
const express = require("express");
const Booking = require("../models/bookingModel");
const authMiddleware = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const booking = new Booking({ ...req.body, createdBy: req.user.userId });
  await booking.save();
  res.status(201).json({ msg: "Booking created", booking });
});

router.get("/", authMiddleware, async (req, res) => {
  const query = req.user.role === "admin" ? {} : { createdBy: req.user.userId };
  const bookings = await Booking.find(query);
  res.json(bookings);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, createdBy: req.user.userId, status: "pending" });
  if (!booking) return res.status(404).json({ msg: "Booking not found or can't update" });

  booking.service = req.body.service || booking.service;
  booking.dateTime = req.body.dateTime || booking.dateTime;
  await booking.save();

  res.json({ msg: "Booking updated", booking });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, createdBy: req.user.userId, status: "pending" });
  if (!booking) return res.status(404).json({ msg: "Booking not found or can't cancel" });

  booking.status = "cancelled";
  await booking.save();

  res.json({ msg: "Booking cancelled" });
});

router.patch("/:id/approve", authMiddleware, adminOnly, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  res.json({ msg: "Booking approved", booking });
});

router.patch("/:id/reject", authMiddleware, adminOnly, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
  res.json({ msg: "Booking rejected", booking });
});

router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ msg: "Booking deleted" });
});

module.exports = router;

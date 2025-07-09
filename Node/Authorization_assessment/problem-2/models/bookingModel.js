const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: String,
  dateTime: String,
  status: { type: String, enum: ["pending", "approved", "rejected", "cancelled"], default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Booking", bookingSchema);

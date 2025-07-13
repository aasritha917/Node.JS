const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"], default: "Order Received" }
});

module.exports = mongoose.model("Order", orderSchema);

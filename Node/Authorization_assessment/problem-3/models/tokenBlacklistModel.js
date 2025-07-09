const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: String,
  type: { type: String, enum: ["access", "refresh"] },
  blacklistedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TokenBlacklist", tokenSchema);

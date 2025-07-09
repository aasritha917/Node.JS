const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["free", "premium"] },
  body: String
});

module.exports = mongoose.model("Content", contentSchema);

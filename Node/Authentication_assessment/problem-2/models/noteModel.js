const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;

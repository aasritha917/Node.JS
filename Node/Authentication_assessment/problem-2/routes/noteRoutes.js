const express = require("express");
const Note = require("../models/noteModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ title, content, createdBy: req.user.userId });
    await note.save();
    res.status(201).json({ msg: "Note created", note });
  } catch (err) {
    res.status(500).json({ msg: "Error creating note", error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notes" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id, createdBy: req.user.userId });
    if (!note) return res.status(404).json({ msg: "Note not found or not yours" });

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    res.json({ msg: "Note updated", note });
  } catch (err) {
    res.status(500).json({ msg: "Error updating note", error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, createdBy: req.user.userId });
    if (!note) return res.status(404).json({ msg: "Note not found or not yours" });

    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting note", error: err.message });
  }
});

module.exports = router;

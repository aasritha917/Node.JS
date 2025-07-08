const express = require("express");
const Blog = require("../models/blong.model");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

router.post("/blogs", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, createdBy: req.user });
    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ message: "Error creating blog" });
  }
});

router.get("/blogs", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user });
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

router.put("/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Unauthorized or not found" });
    res.status(200).json({ message: "Blog updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

router.delete("/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ _id: req.params.id, createdBy: req.user });
    if (!deleted) return res.status(404).json({ message: "Unauthorized or not found" });
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

router.get("/blogs/stats", authMiddleware, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const blogsPerUser = await Blog.aggregate([
      { $group: { _id: "$createdBy", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $project: { _id: 0, user: "$user.name", count: 1 } }
    ]);

    const mostCommonTags = await Blog.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      totalBlogs,
      blogsPerUser,
      mostCommonTags
    });
  } catch (err) {
    res.status(500).json({ message: "Aggregation error" });
  }
});

module.exports = router;
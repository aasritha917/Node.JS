const express = require("express");
const User = require("../models/userModel");
const Book = require("../models/bookModel");

const router = express.Router();

router.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/add-book", async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/rent-book", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ message: "User or Book not found" });

    if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
    if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book rented successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/return-book", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ message: "User or Book not found" });

    user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
    book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user-rentals/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("rentedBooks");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user, books: user.rentedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/book-renters/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("rentedBy");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ book, users: book.rentedBy });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-book/:bookId", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated", book: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete-book/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await User.updateMany(
      { rentedBooks: book._id },
      { $pull: { rentedBooks: book._id } }
    );

    await Book.findByIdAndDelete(book._id);

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const Book = require("../models/bookModel");
const Member = require("../models/memberModel");

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book added", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json({ message: "Member added", member });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { bookId, memberId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);
    if (!book || !member) return res.status(404).json({ message: "Book or Member not found" });

    if (book.status === "borrowed") return res.status(400).json({ message: "Book already borrowed" });

    book.status = "borrowed";
    book.borrowers.push(member._id);
    member.borrowedBooks.push(book._id);

    await book.save();
    await member.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { bookId, memberId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);
    if (!book || !member) return res.status(404).json({ message: "Book or Member not found" });

    book.status = "available";
    book.borrowers = book.borrowers.filter(id => id.toString() !== memberId);
    member.borrowedBooks = member.borrowedBooks.filter(id => id.toString() !== bookId);

    await book.save();
    await member.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMemberBooks = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId).populate("borrowedBooks");
    if (!member) return res.status(404).json({ message: "Member not found" });

    res.status(200).json({ borrowedBooks: member.borrowedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookBorrowers = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("borrowers");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ borrowers: book.borrowers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.status(200).json({ message: "Book updated", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await Member.updateMany(
      { borrowedBooks: book._id },
      { $pull: { borrowedBooks: book._id } }
    );

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

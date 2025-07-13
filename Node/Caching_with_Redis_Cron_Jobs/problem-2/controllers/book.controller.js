const Book = require("../models/book.model");

exports.getBooks = async (req, res) => {
  const books = await Book.find({user:req.user.uid});
  return res.json(books);
};

exports.addBook = async (req, res) => {
  const book = new Book({...req.body, user:req.user.uid});
  await book.save();
  res.json({msg:"Book added", book});
};


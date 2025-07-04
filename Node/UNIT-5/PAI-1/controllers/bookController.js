const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
};

exports.getBooksByAuthor = async (req, res) => {
  const { authorId } = req.params;
  const { available } = req.query;
  const filter = { author: authorId };
  if (available === 'true') filter.available = true;

  const books = await Book.find(filter).populate('author');
  res.json(books);
};

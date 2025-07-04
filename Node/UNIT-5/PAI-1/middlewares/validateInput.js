const Author = require('../models/Author');
const Book = require('../models/Book');

exports.validateAuthor = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Author name is required' });
  next();
};

exports.validateBook = async (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Book title and author are required' });

  const authorExists = await Author.findById(author);
  if (!authorExists) return res.status(400).json({ error: 'Author does not exist' });

  const bookCount = await Book.countDocuments({ author });
  if (bookCount >= 5) return res.status(400).json({ error: 'Author already has 5 books' });

  next();
};

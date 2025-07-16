const Author = require('../models/Author');
const Book = require('../models/Book');

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) { next(err); }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) { next(err); }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    await Book.updateMany({ author: req.params.id }, { $set: { author: null } });
    res.json({ message: 'Author deleted and books orphaned' });
  } catch (err) { next(err); }
};

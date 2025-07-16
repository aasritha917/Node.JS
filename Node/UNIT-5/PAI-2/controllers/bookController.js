const Book = require('../models/Book');
const redisClient = require('../utils/redisClient');

exports.getBooks = async (req, res, next) => {
  try {
    const cacheKey = req.originalUrl;
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const query = req.query.top ? Book.find({ deleted: false }).sort('-pages').limit(5) : Book.find({ deleted: false });
    const books = await query.populate('author');
    await redisClient.setEx(cacheKey, 30, JSON.stringify(books));
    res.json(books);
  } catch (err) { next(err); }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) { next(err); }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { deleted: true });
    res.json({ message: 'Book soft-deleted' });
  } catch (err) { next(err); }
};
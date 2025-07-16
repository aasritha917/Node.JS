const Book = require('../models/Book');

exports.topAuthors = async (req, res, next) => {
  try {
    const stats = await Book.aggregate([
      { $match: { deleted: false } },
      { $group: { _id: '$author', totalPages: { $sum: '$pages' } } },
      { $sort: { totalPages: -1 } },
      { $limit: 3 },
    ]);
    res.json(stats);
  } catch (err) { next(err); }
};

exports.genreBreakdown = async (req, res, next) => {
  try {
    const stats = await Book.aggregate([
      { $match: { deleted: false } },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (err) { next(err); }
};

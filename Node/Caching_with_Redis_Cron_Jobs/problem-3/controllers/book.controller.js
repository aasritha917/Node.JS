const Book = require("../models/book");

const REDIS = require("ioredis");
const redis = new REDIS();

exports.getBooks = async (req, res) => {
  const key = `books:${req.user.userId}`;
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));

  const list = await Book.find({ userId: req.user.userId });
  await redis.set(key, JSON.stringify(list), "EX", 60);
  res.json(list);
};

async function clearCache(req) {
  await redis.del(`books:${req.user.userId}`);
}

exports.addBook = async (req, res) => {
  const { title, author } = req.body;
  const b = await new Book({ title, author, userId: req.user.userId }).save();
  await clearCache(req);
  res.json({ msg: "Added", book: b });
};

exports.updateBook = async (req, res) => {
  const b = await Book.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, req.body, { new: true });
  if (!b) return res.status(404).json({ msg: "Not found" });
  await clearCache(req);
  res.json({ msg: "Updated", book: b });
};

exports.deleteBook = async (req, res) => {
  const b = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!b) return res.status(404).json({ msg: "Not found" });
  await clearCache(req);
  res.json({ msg: "Deleted" });
};

exports.bulkQueue = async (req, res) => {
  const arr = req.body.books;
  const key = `bulk:${req.user.userId}`;
  await redis.rpush(key, JSON.stringify(arr));
  res.json({ msg: "Queued" });
};

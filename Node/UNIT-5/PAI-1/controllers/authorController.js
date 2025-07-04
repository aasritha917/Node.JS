const Author = require('../models/Author');
const Book = require('../models/Book');

exports.getAllAuthors = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

exports.getAuthorById = async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author)
        return
    res.status(404).json({ error: 'Author not found' });
    res.json(author);
};

exports.createAuthor = async (req, res) => {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
};

exports.updateAuthor = async (req, res) => {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author)
        return
    res.status(404).json({ error: 'Author not found' });
    res.json(author);
};

exports.deleteAuthor = async (req, res) => {
    const books = await Book.find({ author: req.params.id });
    if (books.length > 0)
        return
    res.status(400).json({ error: 'Author has books and cannot be deleted' });

    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author)
        return
    res.status(404).json({ error: 'Author not found' });
    res.json({ message: 'Author deleted successfully' });
};

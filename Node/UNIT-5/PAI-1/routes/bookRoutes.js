const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');
const { validateBook } = require('../middlewares/validateInput');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', validateBook, controller.createBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);
router.get('/author/:authorId', controller.getBooksByAuthor);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authorController');
const { validateAuthor } = require('../middlewares/validateInput');

console.log('validateAuthor type:', typeof validateAuthor)

router.get('/', controller.getAllAuthors);
router.get('/:id', controller.getAuthorById);
router.post('/', validateAuthor, controller.createAuthor);
router.put('/:id', controller.updateAuthor);
router.delete('/:id', controller.deleteAuthor);

module.exports = router;

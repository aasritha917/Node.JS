const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookController');
const protect = require('../middleware/auth');
const restrict = require('../middleware/role');

router.get('/', ctrl.getBooks);
router.post('/', protect, restrict('admin', 'editor'), ctrl.createBook);
router.delete('/:id', protect, restrict('admin', 'editor'), ctrl.deleteBook);

module.exports = router;
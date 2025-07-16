const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authorController');
const protect = require('../middleware/auth');
const restrict = require('../middleware/role');

router.get('/', ctrl.getAuthors);
router.post('/', protect, restrict('admin', 'editor'), ctrl.createAuthor);
router.delete('/:id', protect, restrict('admin', 'editor'), ctrl.deleteAuthor);

module.exports = router;
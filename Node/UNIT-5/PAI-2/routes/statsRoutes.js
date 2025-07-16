const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/statsController');

router.get('/top-authors', ctrl.topAuthors);
router.get('/genre-breakdown', ctrl.genreBreakdown);

module.exports = router;

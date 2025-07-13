const express = require("express");
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook } = require("../controllers/book.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;

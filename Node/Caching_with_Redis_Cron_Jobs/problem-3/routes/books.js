const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", bookController.getBooks);
router.post("/", bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.post("/bulk", bookController.bulkQueue);

module.exports = router;

const express = require("express");
const controller = require("../controllers/libraryController");
const router = express.Router();

router.post("/add-book", controller.addBook);
router.post("/add-member", controller.addMember);
router.post("/borrow-book", controller.borrowBook);
router.post("/return-book", controller.returnBook);
router.get("/member-borrowed-books/:memberId", controller.getMemberBooks);
router.get("/book-borrowers/:bookId", controller.getBookBorrowers);
router.put("/update-book/:bookId", controller.updateBook);
router.delete("/delete-book/:bookId", controller.deleteBook);

module.exports = router;

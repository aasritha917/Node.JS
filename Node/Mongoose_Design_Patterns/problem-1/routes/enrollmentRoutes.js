const express = require("express");
const router = express.Router();
const controller = require("../controllers/enrollmentController");

router.post("/", controller.enroll);

module.exports = router;

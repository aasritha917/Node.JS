const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");

router.post("/", controller.createStudent);
router.delete("/:id", controller.deleteStudent);
router.get("/:id/courses", controller.getStudentCourses);

module.exports = router;

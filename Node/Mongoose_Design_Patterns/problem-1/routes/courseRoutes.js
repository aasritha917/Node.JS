const express = require("express");
const router = express.Router();
const controller = require("../controllers/courseController");

router.post("/", controller.createCourse);
router.delete("/:id", controller.deleteCourse);
router.get("/:id/students", controller.getCourseStudents);

module.exports = router;

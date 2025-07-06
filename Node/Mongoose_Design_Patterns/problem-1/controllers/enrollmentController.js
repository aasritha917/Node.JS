const Enrollment = require("../models/enrollmentModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");

exports.enroll = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !student.isActive || !course || !course.isActive) {
      return res.status(400).json({ error: "Student or Course is inactive or does not exist." });
    }

    const enrollment = await Enrollment.create({ studentId, courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

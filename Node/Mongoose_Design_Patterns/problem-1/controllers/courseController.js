const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, { isActive: false });
    await Enrollment.updateMany({ courseId: req.params.id }, { isActive: false });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.id, isActive: true })
      .populate({
        path: 'studentId',
        match: { isActive: true }
      });
    const students = enrollments.map(e => e.studentId).filter(Boolean);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

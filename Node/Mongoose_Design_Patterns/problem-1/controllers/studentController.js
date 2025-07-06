const Student = require("../models/studentModel");
const Enrollment = require("../models/enrollmentModel");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false });
    await Enrollment.updateMany({ studentId: req.params.id }, { isActive: false });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.id, isActive: true })
      .populate({
        path: 'courseId',
        match: { isActive: true }
      });
    const courses = enrollments.map(e => e.courseId).filter(Boolean);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

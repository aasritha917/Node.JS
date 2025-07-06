const mongoose = require("mongoose")

const enrollmenSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrolledAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model("Enrollment", enrollmenSchema)

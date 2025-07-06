const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  topic: String,
  time: Date,
  notes: String,
  learnerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Learner' }],
  feedback: String,
  attendance: [{ learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner' }, status: String }],
  isActive: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false }
});

module.exports = mongoose.model('Session', sessionSchema);

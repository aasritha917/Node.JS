const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Mentor', mentorSchema);

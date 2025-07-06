const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Learner', learnerSchema);

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: Number,
  nationality: String,
});

module.exports = mongoose.model('Author', authorSchema);

const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const SyllabusUpload = mongoose.model('SyllabusUpload', syllabusSchema);

module.exports = SyllabusUpload;

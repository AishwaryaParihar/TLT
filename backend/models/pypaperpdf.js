const mongoose = require('mongoose');
const pyPaperSchema = mongoose.Schema({
  pdf: {
    type: String,
    required: true,
  },
  Papertitle: {
    type: String,
    required: true,
  },
  paperimage: {
    type: String,
    required: true,
  },
});

module.exports = PrevYearPaperUpload = mongoose.model(
  'PrevYearPaperUpload',
  pyPaperSchema
);

const mongoose = require('mongoose');
const SyllabusmodelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    // Other fields...
  },
  { timestamps: true }
);

const UnpaidModelDetails = mongoose.model(
  'SyllabuModelDetails',
  SyllabusmodelSchema
);
module.exports = UnpaidModelDetails;

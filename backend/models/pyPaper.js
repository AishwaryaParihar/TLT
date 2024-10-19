const mongoose = require('mongoose');
const pyPapersDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    // Other fields...
  },
  { timestamps: true }
);

const PyPapersDetails = mongoose.model(
  'PyPapersDetails',
  pyPapersDetailsSchema
);
module.exports = PyPapersDetails;

const mongoose = require('mongoose');
const unpaidmodelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    // Other fields...
  },
  { timestamps: true }
);

const UnpaidModelDetails = mongoose.model(
  'UnpaidModelDetails',
  unpaidmodelSchema
);
module.exports = UnpaidModelDetails;

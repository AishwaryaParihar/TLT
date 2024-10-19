// models/ContactForm.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mpcjFormSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  purchasedProduct: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const MPCJFormdetails = mongoose.model('MPCJFormdetails', mpcjFormSchema);

module.exports = MPCJFormdetails;

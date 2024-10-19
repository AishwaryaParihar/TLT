const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminRegistrationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      trim: true, // Trim whitespace
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a model based on the schema
module.exports = mongoose.model('AdminRegistration', adminRegistrationSchema);

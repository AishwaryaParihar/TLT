const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Added required validation for consistency
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Optional: Converts email to lowercase
      trim: true, // Optional: Trims whitespace from email
    },
    password: {
      type: String,
      required: true, // Added required validation for password
    },
    role: {
      type: String,
     default: 'admin', 
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('Userall', userSchema);

module.exports = UserModel;

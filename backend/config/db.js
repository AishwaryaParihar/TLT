require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  console.log('object');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectDB;

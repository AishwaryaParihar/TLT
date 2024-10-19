const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  OrderDate: String,
  Manager: String,
  Region: String,
  SalesMan: String,
  Item: String,
  batch: String,
  batchSection: String,
  // groupDiscussion: String,
  // judgmentWriting: String,
  // translation: String,
  // score: Number,
});

const LeaderboardStudent = mongoose.model('LeaderboardStudent', studentSchema);
module.exports = LeaderboardStudent;

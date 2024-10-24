// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   OrderDate: String,
//   Manager: String,
//   Region: String,
//   SalesMan: String,
//   Item: String,
//   batch: String,
//   batchSection: String,
//   // groupDiscussion: String,
//   // judgmentWriting: String,
//   // translation: String,
//   // score: Number,
// });

// const LeaderboardStudent = mongoose.model('LeaderboardStudent', studentSchema);
// module.exports = LeaderboardStudent;

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  Batch: {
    type: String,
    required: true,
  },
  BatchSection: {
    type: String,
    required: true,
  },
  Scores: {
    saturdayMainsTest: {
      type: Number,
      default: 0,
    },
    MCQ: {
      type: Number,
      default: 0,
    },
    GroupDiscussion: {
      type: Number,
      default: 0,
    },
    JudgmentWriting: {
      type: Number,
      default: 0,
    },
    Translation: {
      type: Number,
      default: 0,
    },
  },
  Badge: {
    type: String,
    enum: ['Gold', 'Silver', 'Bronze', 'None'],
    default: 'None',
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const LeaderboardStudent = mongoose.model('LeaderboardStudent', studentSchema);
module.exports = LeaderboardStudent;

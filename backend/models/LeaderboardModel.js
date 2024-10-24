// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   Name: String,
//   Email: String,
//   Password: String,
//   Course: String,
//   Item: String,
//   Batch: String,
//   BatchSection: String,
//   Scores: Number,
//   MCQ: Number,
//   GroupDiscussion: Number,
//   JudgmentWriting: String,
//   Translation: String,
//   Scores: Number,
//   CreatedAt: Date,
// });

// const LeaderboardStudent = mongoose.model('LeaderboardStudent', studentSchema);
// module.exports = LeaderboardStudent;

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Course: { type: String, required: true },
  Batch: { type: String },
  BatchSection: { type: String },
  SaturdayMainsTest: { type: Number, default: 0 },
  MCQ: { type: Number, default: 0 },
  GroupDiscussion: { type: Number, default: 0 },
  JudgmentWriting: { type: Number, default: 0 },
  Translation: { type: Number, default: 0 },
  Badge: {
    type: String,
    enum: ['Gold', 'Silver', 'Bronze', 'None'],
    default: 'None',
  },
});

const LeaderboardStudent = mongoose.model('LeaderboardStudent', studentSchema);
module.exports = LeaderboardStudent;

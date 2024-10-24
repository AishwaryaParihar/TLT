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

const studentSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Course: { type: String, required: true },
    Batch: { type: String },
    BatchSection: { type: String },
    SaturdayMainsTest: { type: Number },
    MCQ: { type: Number },
    GroupDiscussion: { type: Number },
    JudgmentWriting: { type: Number },
    Translation: { type: Number },
    Badge: {
      type: String,
      enum: ['Gold', 'Silver', 'Bronze', 'None'],
      default: 'None',
    },
  },
  { collection: 'leaderboardstudents' }
);

const LeaderboardStudent = mongoose.model('LeaderboardStudent', studentSchema);
module.exports = LeaderboardStudent;

const LeaderBoardSchema = require('../models/LeaderboardModel');

const createLeaderboard = async (req, res) => {
  const students = req.body;

  if (!Array.isArray(students)) {
    return res
      .status(400)
      .json({ error: 'Invalid data format. Expected an array.' });
  }

  try {
    const results = [];

    for (const student of students) {
      // Check if the student already exists
      const existingStudent = await LeaderBoardSchema.findOne({
        Name: student.Name,
        Course: student.Course,
      });
      if (existingStudent) {
        console.log(`Duplicate entry found for ${student.Name}. Skipping.`);
        continue; // Skip this entry if it already exists
      }

      results.push(await LeaderBoardSchema.create(student));
    }

    res.status(201).json(results);
  } catch (error) {
    console.error('Error saving student details:', error);
    res
      .status(500)
      .json({ error: 'Error saving student details', details: error.message });
  }
};

// Get all paper details
const getAllLeaderboard = async (req, res) => {
  const { batch, batchSection } = req.query;

  try {
    const query = {};
    if (batch) query.batch = batch;
    if (batchSection) query.batchSection = batchSection;

    const papers = await LeaderBoardSchema.find(query); // Apply the query
    res.status(200).json({ success: true, data: papers });
  } catch (error) {
    console.error('Error fetching leaderboard details:', error);
    res.status(500).json({ error: 'Error fetching leaderboard details' });
  }
};

// Update a paper detail
const updateLeaderboard = async (req, res) => {
  const { id } = req.params;
  const { number, name } = req.body;

  try {
    const updatedPaper = await LeaderBoardSchema.findByIdAndUpdate(
      id,
      { number, name },
      { new: true }
    );
    if (!updatedPaper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    res.status(200).json(updatedPaper);
  } catch (error) {
    console.error('Error updating pyPaper details:', error);
    res.status(500).json({ error: 'Error updating pyPaper details' });
  }
};

// Delete a paper detail
const deleteLeaderboard = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPaper = await LeaderBoardSchema.findByIdAndDelete(id);
    if (!deletedPaper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    res.status(200).json({ message: 'Paper deleted successfully' });
  } catch (error) {
    console.error('Error deleting pyPaper details:', error);
    res.status(500).json({ error: 'Error deleting pyPaper details' });
  }
};

module.exports = {
  createLeaderboard,
  getAllLeaderboard,
  updateLeaderboard,
  deleteLeaderboard,
};

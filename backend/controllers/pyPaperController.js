const PyPapersDetails = require('../models/pyPaper');

// Create a new paper detail
const createPyPapersDetail = async (req, res) => {
  const { number, email, name } = req.body;

  if (!name || !email || !number) {
    return res
      .status(400)
      .json({ error: 'Name, email, and number are required fields.' });
  }

  try {
    const pyPapersDetail = new PyPapersDetails({ number, email, name });
    await pyPapersDetail.save();
    res.status(201).json(pyPapersDetail);
  } catch (error) {
    console.error('Error saving pyPaper details:', error);
    res.status(500).json({ error: 'Error saving pyPaper details' });
  }
};

// Get all paper details
const getAllPyPapers = async (req, res) => {
  try {
    const papers = await PyPapersDetails.find();
    res.status(200).json({ success: true, data: papers });
  } catch (error) {
    console.error('Error fetching pyPaper details:', error);
    res.status(500).json({ error: 'Error fetching pyPaper details' });
  }
};

// Update a paper detail
const updatePyPapersDetail = async (req, res) => {
  const { id } = req.params;
  const { number, email, name } = req.body;

  try {
    const updatedPaper = await PyPapersDetails.findByIdAndUpdate(
      id,
      { number, email, name },
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
const deletePyPapersDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPaper = await PyPapersDetails.findByIdAndDelete(id);
    if (!deletedPaper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    res.status(200).json({ message: 'Paper deleted successfully' });
  } catch (error) {
    console.error('Error deleting pyPaper details:', error);
    res.status(500).json({ error: 'Error deleting pyPaper details' });
  }
};

// Get total paper count
const getTotalPyPapersCount = async (req, res) => {
  try {
    const totalForms = await PyPapersDetails.countDocuments();
    res.status(200).json({ totalForms });
  } catch (error) {
    console.error('Error fetching total pyPaper count:', error);
    res.status(500).json({ error: 'Error fetching total pyPaper count' });
  }
};

module.exports = {
  createPyPapersDetail,
  getAllPyPapers,
  updatePyPapersDetail,
  deletePyPapersDetail,
  getTotalPyPapersCount,
};

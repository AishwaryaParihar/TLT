const mongoose = require('mongoose');
require('../models/pypaperpdf');
const Pypschema = mongoose.model('PrevYearPaperUpload');

// Upload PDF Paper
async function createPyPaperPDFupload(req, res) {
  console.log('Request Body:', req.body);
  console.log('Files:', req.files);

  try {
    const { Papertitle } = req.body;

    const paperimage = req.files['paperimage']
      ? req.files['paperimage'][0].filename
      : null;
    const pdf = req.files['pdf'] ? req.files['pdf'][0].filename : null;
    if (!paperimage || !pdf) {
      return res.status(400).json({
        status: 'error',
        message: 'File upload failed. Check field names.',
      });
    }
    await Pypschema.create({ Papertitle, paperimage, pdf });
    return res
      .status(200)
      .json({ status: 'ok', message: 'Paper uploaded successfully' });
  } catch (error) {
    console.error('Error during paper creation:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// Get all uploaded papers
const getPyPaperPDFupload = async (req, res) => {
  try {
    const data = await Pypschema.find({});
    return res.status(200).json({ status: 'ok', data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Update paper data by ID
const updatePyPaperPDFupload = async (req, res) => {
  try {
    const id = req.params.id;
    const paperExist = await Pypschema.findOne({ _id: id });

    if (!paperExist) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    const updateData = req.body;
    if (req.file) {
      updateData.paperimage = req.file.filename;
    }

    const updatedPaper = await Pypschema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return res.status(200).json({ status: 'ok', updatedPaper });
  } catch (error) {
    console.error('Error updating paper:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Delete paper data by ID
const deletePyPaperPDFupload = async (req, res) => {
  try {
    const id = req.params.id;
    const paperExist = await Pypschema.findById({ _id: id });

    if (!paperExist) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    await Pypschema.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Paper deleted successfully' });
  } catch (error) {
    console.error('Error deleting paper:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createPyPaperPDFupload,
  getPyPaperPDFupload,
  updatePyPaperPDFupload,
  deletePyPaperPDFupload,
};

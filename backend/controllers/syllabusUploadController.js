const SyllabusUpload = require('../models/syllabus');

// Controller to handle file upload (create)
const createSyllabusUpload = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'error', message: 'File is required' });
    }
    const fileName = req.file.filename;
    const newSyllabus = new SyllabusUpload({ title, pdf: fileName });
    await newSyllabus.save();
    res.status(201).json({ status: 'success', data: newSyllabus });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all syllabus files
const getSyllabusFiles = async (req, res) => {
  try {
    const syllabuses = await SyllabusUpload.find();
    res.status(200).json({ status: 'success', data: syllabuses });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Update syllabus by ID
const updateSyllabusById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {};
    if (req.body.title) updatedData.title = req.body.title;
    if (req.file) updatedData.pdf = req.file.filename;

    const updatedSyllabus = await SyllabusUpload.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedSyllabus) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Syllabus not found' });
    }
    res.status(200).json({ status: 'success', data: updatedSyllabus });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Delete syllabus by ID
const deleteSyllabusById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSyllabus = await SyllabusUpload.findByIdAndDelete(id);
    if (!deletedSyllabus) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Syllabus not found' });
    }
    res
      .status(204)
      .json({ status: 'success', message: 'Syllabus deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createSyllabusUpload,
  getSyllabusFiles,
  updateSyllabusById,
  deleteSyllabusById,
};

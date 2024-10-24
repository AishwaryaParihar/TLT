const UnpaidProduct = require('../models/UnpaidProduct');
const fs = require('fs');
const path = require('path');

exports.uploadUnpaidFile = async (req, res) => {
  try {
    const unpaid = new UnpaidProduct({
      title: req.body.title,
      pdf: req.file.filename,
    });
    await unpaid.save();
    res.status(201).json({ message: 'Unpaid file uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload unpaid file', error });
  }
};

exports.getUnpaidFiles = async (req, res) => {
  try {
    const unpaidFiles = await UnpaidProduct.find();
    res.status(200).json({ data: unpaidFiles });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve unpaid files', error });
  }
};

exports.updateUnpaidFile = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
    };
    if (req.file) {
      updatedData.pdf = req.file.filename;
    }
    const unpaid = await UnpaidProduct.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res
      .status(200)
      .json({ message: 'Unpaid file updated successfully', unpaid });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update unpaid file', error });
  }
};

exports.deleteUnpaidFile = async (req, res) => {
  try {
    const unpaid = await UnpaidProduct.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Unpaid file deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete unpaid file', error });
  }
};

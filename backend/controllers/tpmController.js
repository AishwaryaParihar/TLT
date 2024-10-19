const TpmFormDetails = require('../models/tpm');

// Save TPM form details
const createTpmFormDetails = async (req, res) => {
  const { name, email, contact, purchasedProduct } = req.body;
  console.log('Received request to save TPM form details:', req.body);

  try {
    const newTpmFormDetails = new TpmFormDetails({
      name,
      email,
      contact,
      purchasedProduct,
    });

    await newTpmFormDetails.save();
    res.status(201).send({ message: 'TPM form details saved successfully' });
  } catch (error) {
    console.error('Error saving TPM form details:', error);
    res.status(400).send({ message: 'Error saving TPM form details', error });
  }
};

// Find all TPM form details
const getTpmFormDetails = async (req, res) => {
  console.log('Received request to find TPM form details');

  try {
    const tpmFormDetails = await TpmFormDetails.find();
    res.status(200).send(tpmFormDetails);
  } catch (error) {
    console.error('Error retrieving TPM form details:', error);
    res.status(400).send({ message: 'Error retrieving TPM form details', error });
  }
};

// Update TPM form details by ID
const updateTpmFormDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, purchasedProduct } = req.body;
  console.log(`Received request to update TPM form details for ID: ${id}`);

  try {
    const updatedTpmFormDetails = await TpmFormDetails.findByIdAndUpdate(
      id,
      { name, email, contact, purchasedProduct },
      { new: true }
    );

    if (!updatedTpmFormDetails) {
      return res.status(404).send({ message: 'TPM form details not found' });
    }

    res.status(200).send({ message: 'TPM form details updated successfully', data: updatedTpmFormDetails });
  } catch (error) {
    console.error('Error updating TPM form details:', error);
    res.status(400).send({ message: 'Error updating TPM form details', error });
  }
};

// Delete TPM form details by ID
const deleteTpmFormDetails = async (req, res) => {
  const { id } = req.params;
  console.log(`Received request to delete TPM form details for ID: ${id}`);

  try {
    const deletedTpmFormDetails = await TpmFormDetails.findByIdAndDelete(id);

    if (!deletedTpmFormDetails) {
      return res.status(404).send({ message: 'TPM form details not found' });
    }

    res.status(200).send({ message: 'TPM form details deleted successfully' });
  } catch (error) {
    console.error('Error deleting TPM form details:', error);
    res.status(400).send({ message: 'Error deleting TPM form details', error });
  }
};

// Get total TPM form count
const getTotalTpmCount = async (req, res) => {
  console.log('Received request to get total TPM form count');

  try {
    const count = await TpmFormDetails.countDocuments();
    res.status(200).send({ totalForms: count });
  } catch (error) {
    console.error('Error getting total TPM form count:', error);
    res.status(400).send({ message: 'Error getting total TPM form count', error });
  }
};

module.exports = {
  createTpmFormDetails,
  getTpmFormDetails,
  updateTpmFormDetails,
  deleteTpmFormDetails,
  getTotalTpmCount, // Export the new count controller
};

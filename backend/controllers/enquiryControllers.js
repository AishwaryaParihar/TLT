const EnquiryDetails = require('../models/enquiry'); 

// Save Enquiry details
const createEnquiryDetails = async (req, res) => {
    const { name, email, mobile, interestedFor, batch, status, foundUs } = req.body;

    try {
      const newEnquiryDetails = new EnquiryDetails({
        name,
        email,
        mobile,
        interestedFor,
        batch,
        status,
        foundUs,
      });

    await newEnquiryDetails.save();
    res.status(201).send({ message: 'Enquiry details saved successfully' });
  } catch (error) {
    console.error('Error saving Enquiry details:', error);
    res.status(400).send({ message: 'Error saving Enquiry details', error });
  }
};

// Find all Enquiry details
const getEnquiryDetails = async (req, res) => {
  console.log('Received request to find Enquiry details');

  try {
    const enquiryDetails = await EnquiryDetails.find();
    res.status(200).send(enquiryDetails);
  } catch (error) {
    console.error('Error retrieving Enquiry details:', error);
    res.status(400).send({ message: 'Error retrieving Enquiry details', error });
  }
};

// Update Enquiry details by ID
const updateEnquiryDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, interestedFor, batch, status, foundUs } = req.body;
  console.log(`Received request to update Enquiry details for ID: ${id}`);

  try {
    const updatedEnquiryDetails = await EnquiryDetails.findByIdAndUpdate(
      id,
      { name, email, mobile, interestedFor, batch, status, foundUs },
      { new: true }
    );

    if (!updatedEnquiryDetails) {
      return res.status(404).send({ message: 'Enquiry details not found' });
    }

    res.status(200).send({ message: 'Enquiry details updated successfully', data: updatedEnquiryDetails });
  } catch (error) {
    console.error('Error updating Enquiry details:', error);
    res.status(400).send({ message: 'Error updating Enquiry details', error });
  }
};

// Delete Enquiry details by ID
const deleteEnquiryDetails = async (req, res) => {
  const { id } = req.params;
  console.log(`Received request to delete Enquiry details for ID: ${id}`);

  try {
    const deletedEnquiryDetails = await EnquiryDetails.findByIdAndDelete(id);

    if (!deletedEnquiryDetails) {
      return res.status(404).send({ message: 'Enquiry details not found' });
    }

    res.status(200).send({ message: 'Enquiry details deleted successfully' });
  } catch (error) {
    console.error('Error deleting Enquiry details:', error);
    res.status(400).send({ message: 'Error deleting Enquiry details', error });
  }
};

// Get total Enquiry count
const getTotalEnquiryCount = async (req, res) => {
  console.log('Received request to get total Enquiry count');

  try {
    const count = await EnquiryDetails.countDocuments();
    res.status(200).send({ totalEnquiries: count });
  } catch (error) {
    console.error('Error getting total Enquiry count:', error);
    res.status(400).send({ message: 'Error getting total Enquiry count', error });
  }
};

module.exports = {
  createEnquiryDetails,
  getEnquiryDetails,
  updateEnquiryDetails,
  deleteEnquiryDetails,
  getTotalEnquiryCount, 
};

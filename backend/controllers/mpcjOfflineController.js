const MPCJFormDetails = require('../models/mpcjOfflineMT');
const axios = require('axios');
const crypto = require('crypto');
const BACKEND_URL = process.env.BACKEND_URL

// Generate a unique transaction ID
const generateTransactionID = () => {
  return `MPCJ_${Date.now()}`;
};

// Save MPCJ form details and initiate payment
const createMPCJFormDetails = async (req, res) => {
  const { name, email, contact, purchasedProduct } = req.body;
  console.log('Received request to save MPCJ form details:', req.body);

  const data = {
    merchantId: 'M22U3BAWIN1EZ',
    merchantTransactionId: generateTransactionID(),
    merchantUserId: 'M22U3BAWIN1EZ_1.json',
    amount: 4999*100, // Set the amount based on the selected product
    redirectUrl: `${BACKEND_URL}/api/mpcjpaymentStatus`,
    redirectMode: 'REDIRECT',
    mobileNumber: contact,
    paymentInstrument: { type: 'PAY_PAGE' },
  };

  const payload = JSON.stringify(data);
  const payloadMain = Buffer.from(payload).toString('base64');
  const key = '9ab60f05-ecde-447b-b534-46b9db2d612a';
  const KeyIndex = 1;

  const stringToHash = `${payloadMain}/pg/v1/pay${key}`;
  const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const checksum = `${sha256}###${KeyIndex}`;

  const options = {
    method: 'POST',
    url: 'https://api.phonepe.com/apis/hermes/pg/v1/pay',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
    },
    data: { request: payloadMain },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    // Save to the database after successful payment initiation
    const newMPCJFormDetails = new MPCJFormDetails({
      name,
      email,
      contact,
      purchasedProduct,
    });
    await newMPCJFormDetails.save();

    return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url);
  } catch (error) {
    console.error('Payment gateway error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ status: 'Payment gateway error', error: error.message });
  }
};

// Find all MPCJ form details
const getMPCJFormDetails = async (req, res) => {
  console.log('Received request to find MPCJ form details');

  try {
    const mpcjFormDetails = await MPCJFormDetails.find();
    res.status(200).send(mpcjFormDetails);
  } catch (error) {
    console.error('Error retrieving MPCJ form details:', error);
    res.status(500).send({ message: 'Error retrieving MPCJ form details', error });
  }
};

// Update MPCJ form details by ID
const updateMPCJFormDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, purchasedProduct } = req.body;
  console.log(`Received request to update MPCJ form details for ID: ${id}`);

  try {
    const updatedMPCJFormDetails = await MPCJFormDetails.findByIdAndUpdate(
      id,
      { name, email, contact, purchasedProduct },
      { new: true }
    );

    if (!updatedMPCJFormDetails) {
      return res.status(404).send({ message: 'MPCJ form details not found' });
    }

    res.status(200).send({ message: 'MPCJ form details updated successfully', data: updatedMPCJFormDetails });
  } catch (error) {
    console.error('Error updating MPCJ form details:', error);
    res.status(400).send({ message: 'Error updating MPCJ form details', error });
  }
};

// Delete MPCJ form details by ID
const deleteMPCJFormDetails = async (req, res) => {
  const { id } = req.params;
  console.log(`Received request to delete MPCJ form details for ID: ${id}`);

  try {
    const deletedMPCJFormDetails = await MPCJFormDetails.findByIdAndDelete(id);

    if (!deletedMPCJFormDetails) {
      return res.status(404).send({ message: 'MPCJ form details not found' });
    }

    res.status(200).send({ message: 'MPCJ form details deleted successfully' });
  } catch (error) {
    console.error('Error deleting MPCJ form details:', error);
    res.status(400).send({ message: 'Error deleting MPCJ form details', error });
  }
};

// Get total number of MPCJ forms
const getTotalMPCJform = async (req, res) => {
  try {
    const totalForms = await MPCJFormDetails.countDocuments();
    res.status(200).send({ totalForms });
  } catch (error) {
    console.error('Error retrieving MPCJ form count:', error);
    res.status(400).send({ message: 'Error retrieving MPCJ form count', error });
  }
};

// Payment status checking
const mpcjpaymentStatus = async (req, res) => {
  const { transactionId, merchantId } = req.body; // Ensure transactionId and merchantId are passed correctly
  const KeyIndex = 1;
  const key = '9ab60f05-ecde-447b-b534-46b9db2d612a';
  const stringToHash = `/pg/v1/mpcjpaymentStatus/${merchantId}/${transactionId}${key}`;
  const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const checksum = `${sha256}###${KeyIndex}`;

  const URL = `https://api.phonepe.com/apis/hermes/pg/v1/mpcjpaymentStatus/${merchantId}/${transactionId}`;

  const options = {
    method: 'GET',
    url: URL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': merchantId,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Payment status error:', error.response ? error.response.data : error.message);
    res.status(500).json({ status: 'Payment status error', error: error.message });
  }
};

// Export the functions to use in routes
module.exports = {
  createMPCJFormDetails,
  getMPCJFormDetails,
  updateMPCJFormDetails,
  deleteMPCJFormDetails,
  getTotalMPCJform,
  mpcjpaymentStatus
};

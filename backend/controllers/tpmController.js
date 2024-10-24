const TpmFormDetails = require('../models/tpm');
const axios = require('axios');
const crypto = require('crypto');
const BACKEND_URL = process.env.BACKEND_URL

// Generate a unique transaction ID
const generateTransactionID = () => {
  return `TPM_${Date.now()}`;
};

// Save TPM form details
const createTpmFormDetails = async (req, res) => {
  const { name, email, contact, purchasedProduct } = req.body;
  console.log('Received request to save TPM form details:', req.body);

  // Validate purchasedProduct
  if (!purchasedProduct) {
    return res.status(400).json({ status: 'error', message: 'purchasedProduct is required.' });
  }

  // Ensure amount is calculated
  const amount = purchasedProduct.split('₹')[1] * 100; // Get amount here

  // Generate transaction ID using purchasedProduct
  const data = {
    merchantId: 'M22U3BAWIN1EZ',
    merchantTransactionId: generateTransactionID(purchasedProduct), // Pass purchasedProduct to the function
    merchantUserId: 'M22U3BAWIN1EZ_1.json',
    amount: amount, // Use the amount calculated from purchasedProduct
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

    const newTpmFormDetails = new TpmFormDetails({
      name,
      email,
      contact,
      purchasedProduct,
    });

    await newTpmFormDetails.save();
    return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url);
  } catch (error) {
    console.error('Payment gateway error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ status: 'Payment gateway error', error: error.message });
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

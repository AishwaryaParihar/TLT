const FastTrackForm = require('../models/FastTrackForm');
const axios = require('axios');
const crypto = require('crypto'); // Make sure to import crypto
const Backend_Url = process.env.BACKEND_URL;

const generateTransctionID = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const merchantPrefix = 'T';
  return `${merchantPrefix} ${timestamp} ${randomNum}`;
};

const FastTrackFormDetails = async (req, res) => {
  try {
    console.log('Request received:', req.body, req.files);

    if (!req.files || !req.files['picture'] || !req.files['aadharCard']) {
      return res
        .status(400)
        .json({ error: 'Both picture and aadharCard fields are required.' });
    }

    const {
      name,
      batch,
      placeOfBirth,
      dateOfBirth,
      fullAddress,
      state,
      pinCode,
      qualification,
      collegeUniversity,
      pursuingLLB,
      yearOfPassing,
      email,
      fatherName,
      motherName,
      permanentAddress,
      permanentState,
      permanentCity,
      prelims,
      mains,
      targetedstate,
      score,
      year,
      feesPaid,
      amountPaid,
      oldStudentOfShubhamSir,
      institution,
    } = req.body;

    const picture = req.files['picture'][0].path;
    const aadharCard = req.files['aadharCard'][0].path;

    const data = {
      merchantId: 'M22U3BAWIN1EZ',
      merchantTransactionId: generateTransctionID(),
      merchantUserId: 'M22U3BAWIN1EZ_1.json',
      amount:  req.body.amountPaid*100,
      redirectUrl: `${Backend_Url}/api/FastTrackpaystatus`,

      redirectMode: 'REDIRECT',
      mobileNumber: '9999999999',
      paymentInstrument: { type: 'PAY_PAGE' },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const key = '9ab60f05-ecde-447b-b534-46b9db2d612a';
    const KeyIndex = 1;

    const stringToHash = `${payloadMain}/pg/v1/pay${key}`;
    const sha256 = crypto
      .createHash('sha256')
      .update(stringToHash)
      .digest('hex');
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

    const response = await axios.request(options);
    console.log(response.data);

    // Save the form data
    const newFastTrackForm = new FastTrackForm({
      picture,
      batch,
      name,
      placeOfBirth,
      dateOfBirth,
      fullAddress,
      state,
      pinCode,
      qualification,
      collegeUniversity,
      pursuingLLB,
      yearOfPassing,
      email,
      fatherName,
      motherName,
      permanentAddress,
      permanentState,
      permanentCity,
      aadharCard,
      feesPaid,
      amountPaid,
      prelims,
      mains,
      targetedstate,
      score,
      year,
      oldStudentOfShubhamSir,
      institution,
    });

    await newFastTrackForm.save();

    // If the payment initiation is successful, send the redirect URL
    if (response.data.success) {
      return res
        .status(200)
        .send(response.data.data.instrumentResponse.redirectInfo.url);
    } else {
      return res.status(500).json({ error: 'Payment initiation failed' });
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};

const FastTrackpayStatus = async (req, res) => {
  const merchantTransactionId = req.body.transactionId; // Fix: Use req.body
  const merchantId = req.body.merchantId;
  const KeyIndex = 1;
  const key = '9ab60f05-ecde-447b-b534-46b9db2d612a';
  const String =
    `/pg/v1/FastTrackpaystatus/${merchantId}/${merchantTransactionId}` + key;
  const sha256 = crypto.createHash('sha256').update(String).digest('hex'); // Fix: Use 'digest'
  const checksum = sha256 + '###' + KeyIndex;

  // const URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;

  const URL = `https://api.phonepe.com/apis/hermes/pg/v1/FastTrackpaystatus/${merchantId}/${merchantTransactionId}`;

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
    res.status(200).json(response.data); // Send the response back to client
  } catch (error) {
    console.error(
      'Payment status error:',
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ status: 'Payment status error', error: error.message });
  }
};

// get the data from backend to admin portal
const getFastTrackForm = async (req, res) => {
  try {
    const fastTrackFormData = await FastTrackForm.find();
    res.status(200).json({ fastTrackFormData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
// get is by id 
const getFastTrackData= async (req, res) => {
  const { id } = req.params;
  try {
    const fastTrackData = await FastTrackForm.findById(id);
    console.log("fastTrackData",fastTrackData)
    res.status(200).json({ fastTrackData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete FastTrackForm Controller
const deleteFastTrackForm = async (req, res) => {
  try {
    const formId = req.params.id; // Get form ID from request parameters

    const deletedForm = await FastTrackForm.findByIdAndDelete(formId);

    if (!deletedForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update FastTrackForm by ID
const updateFastTrackForm = async (req, res) => {
  try {
    console.log('Update Request received:', req.body);
    const { id } = req.params;
    const updatedData = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    const updatedForm = await FastTrackForm.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getTotalFastTrackForms = async (req, res) => {
  try {
    const totalForms = await FastTrackForm.countDocuments();
    res.status(200).json({ totalForms });
  } catch (error) {
    console.error('Error fetching total form count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  FastTrackFormDetails,
  FastTrackpayStatus,
  getFastTrackForm,
  deleteFastTrackForm,
  updateFastTrackForm,
  getTotalFastTrackForms,
  getFastTrackData,
  
};

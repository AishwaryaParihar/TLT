const JetForm = require("../models/jetForm");

const createJetForm = async (req, res) => {
  try {
    console.log("Request received:", req.body, req.files);

    if (!req.files || !req.files["photo"] || !req.files["adhaarPhoto"]) {
      return res.status(400).json({ error: 'Both photo and adhaarPhoto fields are required.' });
    }

    const {
      name, email, number, category, address, dob, state, city, gender,guardianName,guardianProfession,
      degree, college, graduationYear, masterGraduationYear, masterUniversityAndDegree,
      annualIncome, accomodationRequirement
    } = req.body;

    const photo = req.files["photo"][0].path;
    const adhaarPhoto = req.files["adhaarPhoto"][0].path;

    const newJetForm = new JetForm({
      name, email, number, category, address, dob, state, city, gender,guardianName,guardianProfession,
      degree, college, graduationYear, masterGraduationYear, masterUniversityAndDegree,
      annualIncome, accomodationRequirement, photo, adhaarPhoto
    });

    await newJetForm.save();
    res.status(201).json({ message: "Jet Form created successfully!", form: newJetForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



const getJetForms = async (req, res) => {
  try {
    const jetForms = await JetForm.find();
    res.status(200).json({ jetForms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteJetForm = async (req, res) => {
  try {
    const formId = req.params.id;

    const deletedForm = await JetForm.findByIdAndDelete(formId);

    if (!deletedForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const updateJetForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const updatedForm = await JetForm.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalJetForms = async (req, res) => {
  try {
    const totalForms = await JetForm.countDocuments();
    res.status(200).json({ totalForms });
  } catch (error) {
    console.error('Error fetching total form count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  createJetForm,
  getJetForms,
  deleteJetForm,
  updateJetForm,
  getTotalJetForms
};

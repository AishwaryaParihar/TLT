// Import the Student model

const StudentSignUp = require("../../models/student/signUp");


// Get logged-in student's profile
exports.getStudentProfile = async (req, res) => {
  try {
    // Assuming you're storing the logged-in student's ID in the req object after authentication
    const studentId = req.student.id;

    // Find the student by ID
    const student = await StudentSignUp.findById(studentId).select('-password'); // Exclude password from the response

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the student's profile
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

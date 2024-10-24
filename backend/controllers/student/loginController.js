// const StudentSignUp = require('../../models/student/signUp');
// const bcrypt = require('bcrypt');

// // Login user
// exports.loginStudent = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const student = await StudentSignUp.findOne({ email });
//     if (!student) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await student.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ success: true, message: 'Login successful', student });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };



const StudentSignUp = require('../../models/student/signUp');
const bcrypt = require('bcrypt');

// Login user
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const student = await StudentSignUp.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return student details without password after successful login
    const { password: _, ...studentDetails } = student._doc;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      student: studentDetails, // Send details without password
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

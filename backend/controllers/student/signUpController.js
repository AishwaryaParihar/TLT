const StudentSignUp = require('../../models/student/signUp');
const bcrypt = require('bcrypt');
// Create new student (Sign Up)
exports.createStudent = async (req, res) => {
    const { name, batch,course, email, password, confirmPassword } = req.body;
  
    if (!name || !batch ||!course || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    try {
      const existingStudent = await StudentSignUp.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newStudent = new StudentSignUp({ name, batch,course, email, password });
      await newStudent.save();
  
      return res.status(201).json({ success: true, message: 'Sign Up successful', student: newStudent });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  // Get all students
  exports.getStudents = async (req, res) => {
    try {
      const students = await StudentSignUp.find();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Get student by ID
  exports.getStudentById = async (req, res) => {
    try {
      const student = await StudentSignUp.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Update student
  exports.updateStudent = async (req, res) => {
    const { name, batch, email,course } = req.body;
  
    try {
      const student = await StudentSignUp.findByIdAndUpdate(req.params.id, { name, batch,course, email }, { new: true });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Delete student
  exports.deleteStudent = async (req, res) => {
    try {
      const student = await StudentSignUp.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };


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

    // Compare the password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ success: true, message: 'Login successful', student });
  } catch (err) {
    console.error("Login error:", err); // Log error details for debugging
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
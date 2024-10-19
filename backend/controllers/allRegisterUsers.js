const UserModel = require("../models/userModel");

// Ensure this is an Express route handler function
async function allRegisterUser(req, res) {
  try {
    console.log("userid all users", req.userId);

    const allUsers = await UserModel.find();
    res.json({
      message: "All users",
      data: allUsers,
      success: true,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

module.exports = allRegisterUser;

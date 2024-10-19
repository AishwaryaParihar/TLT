const UserModel = require("../models/userModel");

// async function userDetailsController(req, res){
//    try{
//       console.log("userId", req.userId) 
//       const user = await UserModel.findById(req.userId)    

      
//    }catch(err){
//       res.status(400).json({
//         message : err.message || err,
//         error : true,
//         success :false
//       })   
//    }
// }
// module.exports = userDetailsController;

const userDetailsController = async (req, res) => {
  try {
    console.log("userId", req.userId);
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    console.log("user", user);

    res.status(200).json({
      message: 'User found',
      error: false,
      success: true,
      data: user,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
// const getUserCount = async (req, res) => {
//   try {
//     const count = await User.find().countDocuments();
//     res.json({ count });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching user count' });
//   }
// };
module.exports = userDetailsController;


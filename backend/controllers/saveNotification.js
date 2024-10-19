// const Notify = require("../models/notify");

// async function saveNotification(req, res) {
//     const { notification } = req.body;
//     try {
//         const addNotify = new Notify({ 
//             notification 
//         });

//         console.log("Notification data:", addNotify);

//         const notifySaved = await addNotify.save();
//         res.status(200).json({
//             message: "Notification successfully added",
//             data: notifySaved,
//             error: false,
//             success: true
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error saving notification", // Corrected the error message
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = saveNotification;

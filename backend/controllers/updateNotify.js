// const Notify = require("../models/notify");

// const Notify = require("../models/notify");

// async function notifyUpdate(req, res) {
//     const { id } = req.params;
//     const { notification, url } = req.body;

//     console.log("Request Body:", req.body);
//     console.log("ID:", id);

//     if (!notification || !url) {
//         return res.status(400).json({ message: 'Notification and URL are required' });
//     }

//     try {
//         const updatedNotification = await Notify.findByIdAndUpdate(
//             id,
//             { notification, url }, 
//             { new: true, runValidators: true }
//         );

//         console.log("Updated Notification:", updatedNotification);

//         if (!updatedNotification) {
//             return res.status(404).json({ message: 'Notification not found' });
//         }

//         res.status(200).json({ 
//             message: 'Notification updated successfully', 
//             data: updatedNotification 
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error updating notification', error: error.message });
//     }
// }

// module.exports = notifyUpdate;

// controllers/notifyController.js
const mongoose = require('mongoose');
require('../models/notify');
const notifySchema = mongoose.model("Notify");

const createNotification = async (req, res) => {
    console.log(req.file); // File information
    const notificationText = req.body.notificationText; // Text data
    const fileName = req.body.url; // Get the file name from multer

    try {
        await notifySchema.create({
            notificationText: notificationText,
            url: fileName // Store the file name
        });
        res.send({ Status: "ok" });
    } catch (error) {
        console.error("Error during Notify creation:", error);
        res.json({ status: error.message });
    }
};

const getNotifications = async (req, res) => {
    try {
        const data = await notifySchema.find({});
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.error(error);
        res.json({ status: error.message });
    }
};


const NotificationUpdate = async(req,res)=>{
    try{
      const id=req.params.id;
      const userExist=await notifySchema.findOne({_id:id})
    if(!userExist){
    return res.status(404).json({message:"User not found"})
    }
    const updateUser=await notifySchema.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json(updateUser)
    }catch(error){
      console.error(error);
      res.json({ status: error.message });
    }}


const Notificationdelete= async(req,res)=>{
    try{
    const id=req.params.id;
    const userExist=await notifySchema.findById({_id:id})
    if(!userExist){
    return res.status(404).json({message:"User Not Found."})
    }
    await  notifySchema.findByIdAndDelete(id)
    res.status(201).json({message:"user Deletes Successfully"})
    }catch(error){
      console.error(error);
      res.json({ status: error.message });
    }
    }


module.exports = {
    createNotification,
    getNotifications,
    NotificationUpdate,
    Notificationdelete
};


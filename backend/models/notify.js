const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
   notificationText:String,
   url:String
});

const Notify = mongoose.model('Notify', notifySchema);

module.exports = Notify;






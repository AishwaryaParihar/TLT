// models/Marquee.js
const mongoose = require('mongoose');

const marqueeSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    // Add other fields as necessary
}, { timestamps: true });

const Marquee = mongoose.model('Marquee', marqueeSchema);
module.exports = Marquee;

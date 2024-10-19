const mongoose = require('mongoose');

const unpaidProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pdf: {
        type: String, // Store PDF URL or path
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UnpaidProduct', unpaidProductSchema);

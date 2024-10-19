const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tpmFormSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  purchasedProduct: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const tpmFormDetails = mongoose.model("tpmFormDetails", tpmFormSchema);
module.exports = tpmFormDetails;

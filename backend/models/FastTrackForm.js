const mongoose = require("mongoose");

const FastTrackFormSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    collegeUniversity: {
      type: String,
      required: true,
    },
    pursuingLLB: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    permanentState: {
      type: String,
      required: true,
    },
    permanentCity: {
      type: String,
      required: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    prelims: {
      type: String,
      enum: ["yes",""],
    },
    mains: {
      type: String,
      enum: ["yes",""],
    },
    targetedstate: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    feesPaid: {
      type: String,
      enum: ["yes"],
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    oldStudentOfShubhamSir: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    institution: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FastTrackForm", FastTrackFormSchema);

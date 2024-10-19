const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empowermentFormSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 3,
    },
    aadharCard: {
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
      enum: ['yes', 'no'],
      required: true,
    },
    yearOfPassing: {
      type: Number,
      required: true,
    },
    Batch: {
      type: String,
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
    oldStudentOfShubhamSir: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
    feesPaid: {
      type: String,
      enum: ['yes'],
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'empowermentFormDetails',
  empowermentFormSchema
);

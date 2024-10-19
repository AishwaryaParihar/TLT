const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JetformSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male","female","other"], required: true },
    category: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    guardianProfession: {
      type: String,
      required: true, // This makes the field required
    },
    guardianName: {
      type: String,
      required: true, // This makes the field required
    },
    photo: { type: String,required: true  },
    adhaarPhoto: { type: String,required: true  },
    degree: { type: String,required: true  },
    college: { type: String,required: true  },
    graduationYear: { type: Number,required: true  },
    masterGraduationYear: { type: Number, required: true  },
    masterUniversityAndDegree: { type: String ,required: true },
    annualIncome: { type: Number,required: true  },
    accomodationRequirement: { type: String, enum: ["yes","no"],required: true  },
  },
  {
    timestamps: true,
  }
);

const JetForm = mongoose.model('JetForm', JetformSchema);

module.exports = JetForm;

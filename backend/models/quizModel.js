const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    question: {
        type: String,
        required: true
    },
    isMultipleAns: {
        type: Boolean,
        required: true
    },
    correctAns: {
        type: [String], 
        required: true
    },
    answers: {
        type: [String],  
        required: true
    }
},
{ timestamps: true });

module.exports = mongoose.model("Quiz", QuizSchema);

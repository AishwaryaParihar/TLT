const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizUser = new Schema({
    
    userName: {
        type: String,
        required: true
    },
   phoneNumber:{
    type:String,
    unique:true,
    required:true,
    
   },
   score:{
    type:String,
    unique:true,
    required:true,
    
   }
},
{ timestamps: true });

module.exports = mongoose.model("QuizUser", QuizUser);
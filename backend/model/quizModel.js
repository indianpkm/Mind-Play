import mongoose from "mongoose";

const quizSchema=mongoose.Schema({
    email:{
        type:String
    },
    score:{
        type:Number
    },
    counter:{
        type:Number
    },
    picture:{
        type:String
    },
    name:{
        type:String
    }
})

const quiz = mongoose.model('QuizData',quizSchema);

export default quiz;
import quiz from "../model/quizModel.js";

export const addQuizData=async (req,res)=>{
    try{
      const newquiz = new quiz(req.body);
      await newquiz.save();
      return res.status(200).json(newquiz)
    }catch(err){
        return res.status(500).json(err.message);
    }
};


export const getTopper=async(req,res)=>{
  try{
      const users= await quiz.find({});
      return res.status(200).json(users);
  }catch(err){
      return res.status(500).json(err.message)
  }
}
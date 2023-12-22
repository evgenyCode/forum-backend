import mongoose from "mongoose";
import QuestionModel from "../models/question.js"
import UserModel from "../models/user.js"
import AnswerModel from "../models/answer.js"


const ADD_QUESTION = async (req, res) => {
  try {

    const user = await UserModel.findOne({ userID: req.body.userID });

    if (!user) {
      return res.status(404).json({ message: 'Vartotojas nerastas' });
    }

   
    const question = new QuestionModel({
      question_title: req.body.question_title,
      question_text: req.body.question_text,
      date: new Date(),
      user_id: new mongoose.Types.ObjectId(user._id),

    });

  const response =await question.save();

   return res.status(201).json({response: response});
}catch(err){ 
  console.log(err);
  return res.status(500).json({message: "Error happened"});
  

}
  };

const DELETE_QUESTION = async (req, res) => {

  try {
    const response = await QuestionModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error happened' });
  }
};  

const GET_QUESTIONS = async (req, res) =>  {
  try {
    const questions = await QuestionModel.find();
    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Įvyko klaida gaunant klausimus' });
  }
};




const GET_QUESTIONS_AND_ANSWERS = async (req, res) => {
  try {
    const questionsWithAnswers = await fetchQuestionsWithAnswers();
    return res.status(200).json({ questions: questionsWithAnswers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Klaida gaunant klausimus su atsakymais' });
  }
};


const fetchQuestionsWithAnswers = async () => {
  try {
  
    const questions = await QuestionModel.find();

   
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
       
        const answers = await AnswerModel.find({ question_id: question._id });
       
        return {
          _id: question._id,
          question_title: question.question_title,
          question_text: question.question_text,
          date: question.date,
          user_id: question.user_id,
          answers: answers,
        };
      })
    );

    return questionsWithAnswers;
  } catch (err) {
    throw err;
  }
};


  const GET_QUESTION_BY_ID = async (req, res) => {
    try {
      const question = await QuestionModel.findById(req.params.id).populate('user_id');
  
      if (!question) {
        return res.status(404).json({ message: 'Klausimas nerastas' });
      }
  
      return res.status(200).json({ question: question });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error happened' });
    }
  };

export { ADD_QUESTION, DELETE_QUESTION, GET_QUESTIONS, GET_QUESTION_BY_ID, GET_QUESTIONS_AND_ANSWERS };



// routes/questions.js
import express from "express";
import auth from '../middleware/auth.js';
import { ADD_QUESTION, GET_QUESTIONS, DELETE_QUESTION, GET_QUESTION_BY_ID, GET_QUESTIONS_AND_ANSWERS } from "../controllers/questions.js";

const router = express.Router();

router.post('/questions', auth, ADD_QUESTION);
router.get('/questions', GET_QUESTIONS);
router.get('/questionsAnswers', GET_QUESTIONS_AND_ANSWERS);
router.get('/questions/:id', GET_QUESTION_BY_ID);  
router.delete('/question/:id', auth, DELETE_QUESTION);

export default router;

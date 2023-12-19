import express from 'express';
import auth from '../middleware/auth.js';
import { ADD_ANSWER, DELETE_ANSWER } from '../controllers/answers.js';

const router = express.Router();

router.post('/answer/:id', auth, ADD_ANSWER); // Pridėti atsakymą
router.delete('/answer/:id/:answerId', auth, DELETE_ANSWER); // Ištrinti atsakymą

export default router;

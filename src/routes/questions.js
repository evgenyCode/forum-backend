import express from "express";
import  auth from '../middleware/auth.js'
import { ADD_QUESTION, 
         GET_QUESTIONS,
        //  GET_LOCATION_BY_ID,
         DELETE_QUESTION,
    
          // DELETE_ANSWER
        //  GET_RANDOM_LOCATION
          } from "../controllers/questions.js";
// import auth from '../middleware/auth.js'          


const router = express.Router();

// router.get("/locations/random", GET_RANDOM_LOCATION); 
router.post('/questions',auth,  ADD_QUESTION);
router.get('/questions', GET_QUESTIONS);
// router.get('/locations/:id', GET_LOCATION_BY_ID);
router.delete('/questions/:id',auth, DELETE_QUESTION);

// router.delete('/answer/:id', DELETE_ANSWER);



  export default router;
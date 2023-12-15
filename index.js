import express from "express";
import cors from "cors";
import questionRouter from './src/routes/questions.js'
import userRouter from './src/routes/users.js'
import mongoose from "mongoose";
import "dotenv/config";


const app = express();

app.use(cors());
app.use(express.json());
app.use(questionRouter);
app.use(userRouter);


mongoose.connect(process.env.MONGO_CONNECTION).then(()=> console.log('Connected!!!')).catch((err)=>{console.log('err:', err)});


app.listen(process.env.PORT, ()=>{
    console.log(`App connected on port ${process.env.PORT}`);
});


const express = require('express');
const app = express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const tutorialRouter=require(`${__dirname}/routes/tutorialRoutes`);
const mcqRouter=require(`${__dirname}/routes/mcqRoutes`);
const codingProblemRouter=require(`${__dirname}/routes/codingProblemRoutes`);
const attemptsRouter=require(`${__dirname}/routes/attemptsRoutes`);
const executeRouter=require(`${__dirname}/routes/codeExecuteRoutes`);
const codeSubmitRouter=require(`${__dirname}/routes/codeSubmitRoutes`);


// const tutorialRouter=require(`${__dirname}/routes/tutorialRoutes`);
// const mcqRouter=require(`${__dirname}/routes/mcqRoutes`);
// const codingProblemRouter=require(`${__dirname}/routes/codingProblemRoutes`);
const courseSubItemRouter=require(`${__dirname}/routes/courseSubItemRoutes`);
const courseItemRouter=require(`${__dirname}/routes/courseItemRoutes`);
const courseRouter=require(`${__dirname}/routes/courseRoutes`);
const userRouter=require(`${__dirname}/routes/userRoutes`);
//Adding middlewares
if(process.env.NODE_ENV === 'DEVELOPMENT')
    app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/tutorials',tutorialRouter);
app.use('/mcqs',mcqRouter);
app.use('/codingproblems',codingProblemRouter);
app.use('/attempts',attemptsRouter);
app.use('/execute',executeRouter);
app.use('/submit',codeSubmitRouter);

app.use(cookieParser());
// app.use('/tutorials',tutorialRouter);
// app.use('/mcqs',mcqRouter);
// app.use('/codingproblems',codingProblemRouter);
app.use('/courseSubItems',courseSubItemRouter);
app.use('/courseItems',courseItemRouter);
app.use('/courses',courseRouter);
app.use('/users',userRouter);
//mounting api endpoints
app.route('/')
.get((request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Server is running'
    });
});
module.exports =app;
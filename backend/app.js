const express = require('express');
const app = express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// const tutorialRouter=require(`${__dirname}/routes/tutorialRoutes`);
// const mcqRouter=require(`${__dirname}/routes/mcqRoutes`);
// const codingProblemRouter=require(`${__dirname}/routes/codingProblemRoutes`);
const courseSubItemRouter=require(`${__dirname}/routes/courseSubItemRoutes`);
const courseItemRouter=require(`${__dirname}/routes/courseItemRoutes`);
const courseRouter=require(`${__dirname}/routes/courseRoutes`);
const userRouter=require(`${__dirname}/routes/userRoutes`);
const attemptRouter=require(`${__dirname}/routes/attemptRoutes`);
const compileCodeRouter=require(`${__dirname}/routes/compileCodeRoutes`);

//Adding middlewares
app.use(cors({origin:'http://localhost:3000/'}));
app.options('*',cors({origin:'http://localhost:3000/'}));
if(process.env.NODE_ENV === 'DEVELOPMENT')
    app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
// app.use('/tutorials',tutorialRouter);
// app.use('/mcqs',mcqRouter);
// app.use('/codingproblems',codingProblemRouter);
app.use('/users',userRouter);
app.use('/courses',courseRouter);
app.use('/courseItems',courseItemRouter);
app.use('/courseSubItems',courseSubItemRouter);
app.use('/attempts',attemptRouter);
app.use("/compile",compileCodeRouter);
//mounting api endpoints
app.get('/',(request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Welcome to GeekyBits..'
    });
});
module.exports =app;
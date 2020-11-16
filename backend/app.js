const express = require('express');
const app = express();
const cors=require('cors');
const morgan = require('morgan');
const tutorialRouter=require(`${__dirname}/routes/tutorialRoutes`);
const mcqRouter=require(`${__dirname}/routes/mcqRoutes`);
const codingProblemRouter=require(`${__dirname}/routes/codingProblemRoutes`);
const courseSubItemRouter=require(`${__dirname}/routes/courseSubItemRoutes`);
const courseItemRouter=require(`${__dirname}/routes/courseItemRoutes`);
const courseRouter=require(`${__dirname}/routes/courseRoutes`);
//Adding middlewares
if(process.env.NODE_ENV === 'DEVELOPMENT')
    app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/tutorials',tutorialRouter);
app.use('/mcqs',mcqRouter);
app.use('/codingproblems',codingProblemRouter);
app.use('/courseSubItems',courseSubItemRouter);
app.use('/courseItems',courseItemRouter);
app.use('/courses',courseRouter);

//mounting api endpoints
app.route('/')
.get((request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Server is running'
    });
});
module.exports =app;
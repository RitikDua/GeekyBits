const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const tutorialRouter=require(`${__dirname}/routes/tutorialRoutes`);
const mcqRouter=require(`${__dirname}/routes/mcqRoutes`);
const codingProblemRouter=require(`${__dirname}/routes/codingProblemRoutes`);
const courseSubItemRouter=require(`${__dirname}/routes/courseSubItemRoutes`);
const courseItemRouter=require(`${__dirname}/routes/courseItemRoutes`);
const courseRouter=require(`${__dirname}/routes/courseRoutes`);
const userRouter=require(`${__dirname}/routes/userRoutes`);
const profileRouter=require(`${__dirname}/routes/profileRoutes`);
const attemptRouter=require(`${__dirname}/routes/attemptRoutes`);
const compileCodeRouter=require(`${__dirname}/routes/compileCodeRoutes`);
const statsRouter=require(`${__dirname}/routes/statsRouter`);

// const contestRouter=require(`${__dirname}/routes/contestRoutes.js`);

//Adding middlewares
app.use((request,response,next)=>{
	response.header("Access-Control-Allow-Origin", "http://localhost:3000");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	response.header("Access-Control-Allow-Credentials", "true");
	if(request.method==='OPTIONS')
		return response.status(200).json({status:'success'});
	next();
});
if(process.env.NODE_ENV === 'DEVELOPMENT')
	app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/tutorials',tutorialRouter);
app.use('/mcqs',mcqRouter);
app.use('/codingProblems',codingProblemRouter);
app.use('/users',userRouter);
app.use('/profile',profileRouter);

app.use('/courses',courseRouter);
app.use('/courseItems',courseItemRouter);
app.use('/courseSubItems',courseSubItemRouter);
app.use('/attempts',attemptRouter);
app.use('/compile',compileCodeRouter);
app.use("/stats",statsRouter);
// app.use('/contests',contestRouter);
//mounting api endpoints
app.get('/',(request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Welcome to GeekyBits..'
    });
});
module.exports =app;

const mongoose=require('mongoose');
const {v4}=require('uuid');
const User = require(`${__dirname}/userModel`);
const CodingProblem = require(`${__dirname}/codingProblemModel`);
const Attempt = require(`${__dirname}/attemptModel`);
const contestSchema=new mongoose.Schema({
    contestUrl:{
        type:String,
        default:v4
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    attempts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Attempt'
    }],
    startedAt:Date,
    endedAt:Date,
    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CodingProblem'
    }
});
contestSchema.index({contestUrl:1});
module.exports=mongoose.model('Contest',contestSchema);
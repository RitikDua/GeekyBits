const mongoose=require('mongoose');
const MCQ=require(`${__dirname}/mcqModel`);
const CodingProblem=require(`${__dirname}/codingProblemModel`);
const attemptSchema=new mongoose.Schema({
    attemptType:String,
    attemptString:String,
    testCasesPassed:[Boolean],
    testCasesUserOutputs:[String],
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'attemptType'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});
module.exports=mongoose.model('Attempt',attemptSchema);
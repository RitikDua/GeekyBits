const mongoose=require('mongoose');
const MCQ=require(`${__dirname}/mcqModel`);
const CodingProblem=require(`${__dirname}/codingProblemModel`);
const attemptSchema=new mongoose.Schema({
    attemptType:String,
    attemptString:String,
    attemptLanguage:String,
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
attemptSchema.index({user:1,problem:1});
module.exports=mongoose.model('Attempt',attemptSchema);
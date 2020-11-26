const mongoose=require('mongoose');
const CodingProblem=require("./codingProblemModel");
const MCQ=require("./mcqModel");
const CourseSubItem=require(`${__dirname}/courseSubItemModel`);
const attemptSchema=new mongoose.Schema({
    attemptType:{
        type:String,
        enum:['MCQ','CodingProblem']
    },
    attemptTitle:String,
    attemptString:String,
    attemptLanguage:String,
    testCasesPassed:[Boolean],
    testCasesUserOutputs:[String],
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseSubItem'
    },
    subItem:{
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
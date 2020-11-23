const mongoose=require('mongoose');
const Tutorial=require(`${__dirname}/tutorialModel`);
const MCQ=require(`${__dirname}/mcqModel`);
const CodingProblem=require(`${__dirname}/codingProblemModel`);
const courseSubItemSchema=new mongoose.Schema({
    subItemTitle:String,
    subItemType:{
        type:String,
        enum:['Tutorial','MCQ','CodingProblem']
    },
    subItem:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'subItemType'
    }       
},{timestamps:true});
module.exports=mongoose.model('CourseSubItem',courseSubItemSchema);
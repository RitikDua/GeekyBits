const mongoose=require('mongoose');
const courseSubItemSchema=new mongoose.Schema({
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
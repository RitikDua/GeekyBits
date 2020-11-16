const mongoose=require('mongoose');
const mcqSchema=new mongoose.Schema({
    mcqTitle:String,
    mcqStatement:String,
    options:[String],
    answer:String
},{timestamps:true});
module.exports=mongoose.model('MCQ',mcqSchema);
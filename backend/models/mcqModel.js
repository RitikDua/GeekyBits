const mongoose=require('mongoose');
const mcqSchema=new mongoose.Schema({
    mcqTitle:String,
    mcqStatement:String,
    options:[String],
    answer:String
});
module.exports=mongoose.model('MCQ',mcqSchema);
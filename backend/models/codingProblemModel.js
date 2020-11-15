const mongoose=require('mongoose');
const codingproblemSchema=new mongoose.Schema({
    problemTitle:String,
    problemStatement:String,
    testCases:[String],
    correctOutput:[String]
},{timestamps:true});
module.exports=mongoose.model('CodingProblem',codingproblemSchema);
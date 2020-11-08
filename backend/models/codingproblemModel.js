const mongoose=require('mongoose');
const codingproblemSchema=new mongoose.Schema({
    problemTitle:{
        type:String,
        required:[true,"Please provide Coding problem title"]
    },
    problemStatement:{
        type:String,
        required:[true,"Please provide Coding problem statement"]
    },
    testCases:[{
        type:String,
        required:[true,"Please provide Coding problem testcases"]
    }],
    correctOutput:[{
        type:String,
        required:[true,"Please provide testcases solution"]
    }]
});
module.exports=mongoose.model('CodingProblem',codingproblemSchema);
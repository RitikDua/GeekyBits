const mongoose=require('mongoose');
const attemptResultSchema=new mongoose.Schema({
    testCasesPassed:[Boolean],
    testCaseUserOutputs:[String]
});
const attemptSchema=new mongoose.Schema({
    attemptType:String,
    attemptString:String,
    attemptResult:String,
    attemptResultDetails:attemptResultSchema,
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`${this.attemptType}`
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    attemptedAt:Date
});
module.exports=mongoose.model('Attempt',attemptSchema);
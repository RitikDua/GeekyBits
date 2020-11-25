const mongoose=require('mongoose');
const CourseSubItem=require(`${__dirname}/courseSubItemModel`);
const attemptSchema=new mongoose.Schema({
    attemptType:String,
    attemptTitle:String,
    attemptString:String,
    attemptLanguage:String,
    testCasesPassed:[Boolean],
    testCasesUserOutputs:[String],
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseSubItem'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});
attemptSchema.index({user:1,problem:1});
module.exports=mongoose.model('Attempt',attemptSchema);
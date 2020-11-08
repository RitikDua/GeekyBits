const mongoose=require('mongoose');
const attemptSchema=new mongoose.Schema({
    attemptType:String,
    attemptString:String,
    problemID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`${this.attemptType}`
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports=mongoose.model('Attempt',attemptSchema);
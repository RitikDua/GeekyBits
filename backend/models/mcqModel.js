const mongoose=require('mongoose');
const mcqSchema=new mongoose.Schema({
    mcqTitle:{
        type:String,
        required:[true,"Please provide mcq title"]
    },
    mcqStatement:{
        type:String,
        required:[true,"Please provide mcq statement"]
    },
    options:[{
        type:String,
        required:[true,"Please provide mcq options"]
    }],
    answer:{
        type:String,
        required:[true,"Please provide mcq answer"]
    }
});
module.exports=mongoose.model('MCQ',mcqSchema);
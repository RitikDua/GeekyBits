const mongoose=require('mongoose');
const tutorialSchema=new mongoose.Schema({
    tutorialTitle:{
        type:String,
        required:[true,"Please provide title of tutorial"]
    },
    content:{
        type:String,
        required:[true,"Please provide content of tutorial"]
    }
});
module.exports=mongoose.model('Tutorial',tutorialSchema);
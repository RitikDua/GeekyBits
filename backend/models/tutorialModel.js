const mongoose=require('mongoose');
const tutorialSchema=new mongoose.Schema({
    tutorialTitle:String,
    content:String,
    codes:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});
module.exports=mongoose.model('Tutorial',tutorialSchema);
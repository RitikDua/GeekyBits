const mongoose=require('mongoose');
const tutorialSchema=new mongoose.Schema({
    tutorialTitle:String,
    content:String,
    codes:[String]
});
module.exports=mongoose.model('Tutorial',tutorialSchema);
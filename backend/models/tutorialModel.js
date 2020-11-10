const mongoose=require('mongoose');
const tutorialSchema=new mongoose.Schema({
    tutorialTitle:String,
    content:String
});
module.exports=mongoose.model('Tutorial',tutorialSchema);
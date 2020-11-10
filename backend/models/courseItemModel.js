const mongoose=require('mongoose');
const courseItemSchema=new mongoose.Schema({
    itemTitle:String,
    subItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseSubItem'
    }],
});
module.exports=mongoose.model('CourseItem',courseItemSchema);
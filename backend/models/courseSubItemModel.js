const mongoose=require('mongoose');
const courseSubItemSchema=new mongoose.Schema({
    subItemType:String,
    subItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`${this.itemType}`      
    }
});
module.exports=mongoose.model('CourseSubItem',courseSubItemSchema);
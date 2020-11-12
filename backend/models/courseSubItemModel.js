const mongoose=require('mongoose');
const courseSubItemSchema=new mongoose.Schema({
    subItemType:String,
    subItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`${this.itemType}`      
    }
},{timestamps:true});
module.exports=mongoose.model('CourseSubItem',courseSubItemSchema);
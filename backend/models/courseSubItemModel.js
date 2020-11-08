const mongoose=require('mongoose');
const courseSubItemSchema=new mongoose.Schema({
    subItemType:{
        type:String,
        required:[true,"Please provide course sub-item type"]
    },
    subItemID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`${this.itemType}`,
        required:[true,"Please provide sub-item ID"]        
    }
});
module.exports=mongoose.model('CourseSubItem',courseSubItemSchema);
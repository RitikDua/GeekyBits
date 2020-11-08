const mongoose=require('mongoose');
const courseItemSchema=new mongoose.Schema({
    itemTitle:{
        type:String,
        required:[true,"Please provide course item Title"]
    },
    subItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseSubItem',
        required:[true,"Please provide course subItems"]
    }],
});
module.exports=mongoose.model('CourseItem',courseItemSchema);
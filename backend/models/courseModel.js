const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    courseTitle:String,
    courseItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseItem'        
    }],
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'        
    }]
},{timestamps:true});

exports.Course=mongoose.model('Course',courseSchema);
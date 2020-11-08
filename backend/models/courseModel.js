const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    courseTitle:{
        type:String,
        required:[true,"Please provide course Title"]
    },
    courseItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseItem',
        required:[true,"Please provide course Items"]
    }],
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Please provide user ids"]
    }]
});

exports.Course=mongoose.model('Course',courseSchema);
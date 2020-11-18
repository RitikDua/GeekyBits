const CourseSubItems=require(`${__dirname}/../models/courseSubItemModel`);
exports.getAllCourseSubItems=async (request,response)=>{
    try{        
        const courseSubItems=await CourseSubItems.find();
        response.status(200).json({
            status:'success',
            data:{
                courseSubItems
            }
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message,
            name:err.name,
            err
        });
    }
};
exports.getCourseSubItemById=async (request,response)=>{
    try{
        const courseSubItemId=request.params.courseSubItemId;        
        const courseSubItem=await CourseSubItems.findById(courseSubItemId).populate('subItem');
        response.status(200).json({
            status:'success',
            data:{
                courseSubItem
            }
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message,
            name:err.name,
            err
        });
    }
};
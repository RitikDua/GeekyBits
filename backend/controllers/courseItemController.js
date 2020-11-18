const CourseItems=require(`${__dirname}/../models/courseItemModel`);
exports.getAllCourseItems=async (request,response)=>{
    try{
        const courseItems=await CourseItems.find();
        response.status(200).json({
            status:'success',
            data:{
                courseItems
            }
        })
    }
    catch (err){
        response.status(500).json({error:err});
    }
};
exports.getCourseItemById=async (request,response)=>{
    try{
        const courseItemId=request.params.courseItemId;
        const courseItem=await CourseItems.findById(courseItemId).populate('subItems');
        response.status(200).json({
            status: 'success',
            data:{
                courseItem
            }
        })
    }
    catch (err){
        response.status(500).json({
            status:'error',
            data:{
                message:err.message,
                name:err.name,
                err
            }
        });
    }
};
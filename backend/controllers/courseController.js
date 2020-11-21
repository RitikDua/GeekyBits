const Courses=require(`${__dirname}/../models/courseModel`);
exports.getCourses=async (request,response)=>{
    try{
        const courses=await Courses.find();
        response.status(200).json({
            status:'success',
            data:{
                courses
            }
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            data:{
                message:err.message,
                name:err.name,
                err
            }
        })
    }
};
exports.getCourseById=async (request,response)=>{
    try{
        const courseId = request.params.courseId;
        const course=await Courses.findById(courseId).populate('courseItems');
        response.status(200).json({
            status:'success',
            data:{
                course
            }
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            data:{
                message:err.message,
                name:err.name,
                err
            }
        })
    }
};
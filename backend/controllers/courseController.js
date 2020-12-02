const Courses=require(`${__dirname}/../models/courseModel`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
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
exports.createCourse=async (request,response)=>{
    try{
        const courseDetails = request.body;
        if(!matchBodyWithSchema(Object.keys(courseDetails),['courseTitle','courseItems','users']))
            return response.status(400).json({status:'error',message:'Please provide course details'});
        const course=await Courses.create(courseDetails);
        response.status(201).json({
            status:'success',
            data:{course}
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
}
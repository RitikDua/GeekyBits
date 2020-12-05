const Courses=require(`${__dirname}/../models/courseModel`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
const getTotalSubItems=(totalItems)=>{
    let totalSubItems=0;
    totalItems.forEach(item=>totalSubItems+=item.subItems.length);
    return totalSubItems;
}
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
        const coursesProgress=request.user.coursesProgress;   
        let courseProgressPercent=0;
        if(coursesProgress){
            const subItemscovered=coursesProgress.get(courseId);            
            if(subItemscovered){
                const totalSubItems=getTotalSubItems(course.courseItems);
                const totalSubItemsCovered=subItemscovered.split(' ').length;
                courseProgressPercent=totalSubItemsCovered/totalSubItems*100;
            }
        }     
        response.status(200).json({
            status:'success',
            data:{
                course,
                courseProgressPercent
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
exports.enrollCourse=async (request,response)=>{
    try{
        const currentUser=request.user;
        const courseId=request.params.courseId;
        const course=await Courses.findById(courseId);
        if(course.users.includes(currentUser._id))
            throw new Error(`User is already enrolled in ${course.courseTitle}`);
        course.users.push=currentUser._id;
        currentUser.courses.push(courseId);
        await Promise.all(course.save(),currentUser.save);
        response.status(200).json({
            status:'success',
            message:`${request.user.name} successfully enrolled in ${course.courseTitle}`
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        })
    }
}
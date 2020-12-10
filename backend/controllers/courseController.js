const Courses=require(`${__dirname}/../models/courseModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
const getTotalSubItems=(totalItems)=>{
    let totalSubItems=0;
    totalItems.forEach(item=>totalSubItems+=item.subItems.length);
    return totalSubItems;
}
exports.getCourses=catchAsyncError(async (request,response,next)=>{
    const courses=await Courses.find();
    response.status(200).json({
        status:'success',
        data:{courses}
    });    
});
exports.getCourseById=catchAsyncError(async (request,response,next)=>{    
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
});
exports.createCourse=catchAsyncError(async (request,response,next)=>{
    const courseDetails = request.body;
    if(!matchBodyWithSchema(Object.keys(courseDetails),['courseTitle','courseItems','users']))
        return next(new AppError('Please provide all course details',400));
    const course=await Courses.create(courseDetails);
    response.status(201).json({
        status:'success',
        data:{course}
    });    
});
exports.enrollCourse=catchAsyncError(async (request,response,next)=>{
    const currentUser=request.user;
    const courseId=request.params.courseId;
    const course=await Courses.findById(courseId);
    if(course.users.includes(currentUser._id))
        return  next(new AppError(`User is already enrolled in ${course.courseTitle}`,400));
    course.users.push=currentUser._id;
    currentUser.courses.push(courseId);
    await Promise.all(course.save(),currentUser.save);
    response.status(200).json({
        status:'success',
        data:{message:`${request.user.name} successfully enrolled in ${course.courseTitle}`}
    });    
});
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
const CourseSubItems=require(`${__dirname}/../models/courseSubItemModel`);
const {updateProgress}=require(`${__dirname}/../utils/updateProgress`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const mongoose = require('mongoose');

exports.getCourseSubItems=catchAsyncError(async (request,response,next)=>{     
    const courseSubItems=await CourseSubItems.find().lean();
    response.status(200).json({
        status:'success',
        data:{
            courseSubItems
        }
    });        
});
exports.getCourseSubItemById=catchAsyncError(async (request,response,next)=>{    
    const courseSubItemId=request.params.courseSubItemId;
    if (!mongoose.Types.ObjectId.isValid(courseSubItemId))
      return next(new AppError("Invalid ID",400));

    const courseId=request.query.key;  
    if(courseId&&!mongoose.Types.ObjectId.isValid(courseId))
        return next(new AppError("Invalid key",400));

    const courseSubItem=await CourseSubItems.findById(courseSubItemId).populate('subItem').lean();
    if (!courseSubItem)
      return next(new AppError("Course Sub Item with given ID not found",404));

    const subItemType=courseSubItem.subItemType;
    if(courseId&&subItemType==='Tutorial'){
        updateProgress(courseId,courseSubItemId,request.user);
    }
    response.status(200).json({
        status:'success',
        data:{
            courseSubItem,
            courseId
        }
    });    
});
exports.createCourseSubItem=catchAsyncError(async (request,response,next)=>{    
    const courseSubItemDetails = request.body;
    if(!matchBodyWithSchema(Object.keys(courseSubItemDetails),['subItemTitle','subItemType','subItem']))
        return next(new AppError('Please provide a courseSubItem details',400));
    const courseSubItem=await CourseSubItems.create(courseSubItemDetails);
    response.status(201).json({
        status:'success',
        data:{courseSubItem}
    });
});
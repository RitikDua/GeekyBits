const CourseItems=require(`${__dirname}/../models/courseItemModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
exports.getCourseItems= catchAsyncError(async (request,response,next)=>{    
    const courseItems=await CourseItems.find().lean();
    response.status(200).json({
        status:'success',
        data:{
            courseItems
        }
    })    
});
exports.getCourseItemById=catchAsyncError(async (request,response,next)=>{    
    const courseItemId=request.params.courseItemId;
    const courseItem=await CourseItems.findById(courseItemId).populate('subItems').lean();
    response.status(200).json({
        status: 'success',
        data:{
            courseItem
        }
    })    
});
exports.createCourseItem=catchAsyncError(async (request,response,next)=>{
    const courseItemDetails = request.body;
    if(!matchBodyWithSchema(Object.keys(courseItemDetails),['itemTitle','subItems']))
        return next(new AppError('Please provide courseItem details'));
    const courseItem=await CourseItems.create(courseItemDetails);
    response.status(201).json({
        status:'success',
        data:{courseItem}
    });
});
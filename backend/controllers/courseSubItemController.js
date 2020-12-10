const CourseSubItems=require(`${__dirname}/../models/courseSubItemModel`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
const {updateProgress}=require(`${__dirname}/../utils/updateProgress`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
exports.getCourseSubItems=catchAsyncError(async (request,response,next)=>{     
    const courseSubItems=await CourseSubItems.find();
    response.status(200).json({
        status:'success',
        data:{
            courseSubItems
        }
    });        
});
exports.getCourseSubItemById=catchAsyncError(async (request,response,next)=>{    
    const courseSubItemId=request.params.courseSubItemId;     
    const courseId=request.query.key;   
    const courseSubItem=await CourseSubItems.findById(courseSubItemId).populate('subItem');
    const subItemType=courseSubItem.subItemType;
    if(courseId&&subItemType==='Tutorial'){
        updateProgress(courseId,courseSubItemId,request.user);
    }
    response.status(200).json({
        status:'success',
        data:{
            courseSubItem
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
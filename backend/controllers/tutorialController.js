const Tutorials=require(`${__dirname}/../models/tutorialModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
exports.getTutorials=catchAsyncError(async (request,response,next)=>{    
        const tutorials=await Tutorials.find();
        response.status(200).json({
            status:'success',
            data:{tutorials}
        });         
});
exports.getTutorialById=catchAsyncError(async (request,response,next)=>{    
        const tutorialId=request.params.tutorialId;
        if(!tutorialId)
            return next(new AppError('Please provide a tutorial id',400));
        const tutorial=await Tutorials.findById(tutorialId);
        response.status(200).json({
            status:'success',
            data:{tutorial}
        });     
});
exports.createTutorial=catchAsyncError(async (request,response,next)=>{    
    const tutorialDetails=request.body;
    if(!matchBodyWithSchema(Object.keys(tutorialDetails),['tutorialTitle','content','codes']))
        return next(new AppError('Please provide tutorial details',400));
    const tutorial=await Tutorials.create(tutorialDetails);
    response.status(201).json({
        status:'success',
        data:{tutorial}
    });     
});
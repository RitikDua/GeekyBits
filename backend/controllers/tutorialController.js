const Tutorials=require(`${__dirname}/../models/tutorialModel`);
exports.getTutorials=async (request,response)=>{
    try {
        const tutorials=await Tutorials.find();
        response.status(200).json({
            status:'success',
            data:{tutorials}
        }); 
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message,
            err
        });
    }
};
exports.getTutorialById=async (request,response)=>{
    try {
        const tutorialId=request.params.tutorialId;
        if(!tutorialId)
            throw new Error('Please provide a valid id');
        const tutorial=await Tutorials.findById(tutorialId);
        response.status(200).json({
            status:'success',
            data:{tutorial}
        }); 
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message,
            err
        });
    }
};
exports.createTutorial=async (request,response)=>{
    try {
        const tutorialDetails=request.body;
        if(!tutorialDetails)
            throw new Error('Please provide tutorial details');
        const tutorial=await Tutorials.create(tutorialDetails);
        response.status(201).json({
            status:'success',
            data:{tutorial}
        }); 
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message,
            err
        });
    }
}
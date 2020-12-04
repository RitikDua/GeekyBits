const Tutorials=require(`${__dirname}/../models/tutorialModel`);
const { matchBodyWithSchema } = require("../utils/matchBodyWithSchema");
const mongoose = require('mongoose');

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
        if (!mongoose.Types.ObjectId.isValid(tutorialId))
            return response.status(404).send("Invalid ID");
        
        const tutorial=await Tutorials.findById(tutorialId);
        if (!tutorial)
            return response.status(404).send("Problem with given ID not found");        
        
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
        if (
            !matchBodyWithSchema(Object.keys(tutorialDetails), [
                "tutorialTitle",
                "content",
                "codes"
            ])
          )
            return response.status(400).send("Please provide valid Tutorial Details ");
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
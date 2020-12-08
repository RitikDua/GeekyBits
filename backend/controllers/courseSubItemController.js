const CourseSubItems=require(`${__dirname}/../models/courseSubItemModel`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
const {updateProgress}=require(`${__dirname}/../utils/updateProgress`);
const mongoose = require('mongoose');

exports.getCourseSubItems=async (request,response)=>{
    try{        
        const courseSubItems=await CourseSubItems.find();
        response.status(200).json({
            status:'success',
            data:{
                courseSubItems
            }
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
};
exports.getCourseSubItemById=async (request,response)=>{
    try{
        const courseSubItemId=request.params.courseSubItemId;     
        if (!mongoose.Types.ObjectId.isValid(courseSubItemId))
            return response.status(404).send("Invalid ID");
        const courseId=request.query.key;   
        const courseSubItem=await CourseSubItems.findById(courseSubItemId).populate('subItem');
        if (!courseSubItem)
            return response.status(404).send("Problem with given ID not found");
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
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message,
            name:err.name,
            err
        });
    }
};
exports.createCourseSubItem=async (request,response)=>{
    try{
        const courseSubItemDetails = request.body;
        if(!matchBodyWithSchema(Object.keys(courseSubItemDetails),['subItemTitle','subItemType','subItem']))
            return response.status(400).json({status:'error',message:'Please provide coursesubitem details'});
        const courseSubItem=await CourseSubItems.create(courseSubItemDetails);
        response.status(201).json({
            status:'success',
            data:{courseSubItem}
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
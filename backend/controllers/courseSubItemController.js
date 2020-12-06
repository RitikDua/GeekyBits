const CourseSubItems=require(`${__dirname}/../models/courseSubItemModel`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
const {updateProgress}=require(`${__dirname}/../utils/updateProgress`);
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
        const courseId=request.query.key;   
        const courseSubItem=await CourseSubItems.findById(courseSubItemId).populate('subItem');
        const subItemType=courseSubItem.subItemType;
        if(subItemType==='Tutorial'){
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
const CourseItems=require(`${__dirname}/../models/courseItemModel`);
const {matchBodyWithSchema}=require(`${__dirname}/../utils/matchBodyWithSchema`);
exports.getCourseItems=async (request,response)=>{
    try{
        const courseItems=await CourseItems.find();
        response.status(200).json({
            status:'success',
            data:{
                courseItems
            }
        })
    }
    catch (err){
        response.status(500).json({error:err});
    }
};
exports.getCourseItemById=async (request,response)=>{
    try{
        const courseItemId=request.params.courseItemId;
        const courseItem=await CourseItems.findById(courseItemId).populate('subItems');
        response.status(200).json({
            status: 'success',
            data:{
                courseItem
            }
        })
    }
    catch (err){
        response.status(500).json({
            status:'error',
            data:{
                message:err.message,
                name:err.name,
                err
            }
        });
    }
};
exports.createCourseItem=async (request,response)=>{
    try{
        const courseItemDetails = request.body;
        if(!matchBodyWithSchema(Object.keys(courseItemDetails),['itemTitle','subItems']))
            return response.status(400).json({status:'error',message:'Please provide courseitem details'});
        const courseItem=await CourseItems.create(courseItemDetails);
        response.status(201).json({
            status:'success',
            data:{courseItem}
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
const Users=require(`${__dirname}/../models/userModel`);
const filterObj=(newDetailsObj)=>{
    const updateObj={},arr=Object.keys(newDetailsObj);
    const updationsAllowed=new Map([['name',true],['email',true],['profilePic',true]]);
    for(let i=0;i<arr.length;i++){
        if(updationsAllowed.has(arr[i]))    
            updateObj[arr[i]]=newDetailsObj[arr[i]];
    };
    return updateObj;
};
exports.getUsers=async (request,response)=>{
    try{
        const users=await Users.find();
        response.status(200).json({
            status:'success',
            data:{users}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.Users
        });
    }
};
exports.getUserById=async (request,response)=>{
    try{
        const userId=request.params.userId;
        const user=await Users.findById(userId);
        response.status(200).json({
            status:'success',
            data:{user}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.Users
        });
    }
};
exports.changePassword=async (request,response)=>{
    try{
        const {currentPassword,newPassword} =request.body;
        const user=await Users.findById(request.user._id).select('+password');
        if(!user)
            throw new Error('User does\'nt exist');
        if(!await user.isPasswordValid(currentPassword,user.password))
            throw new Error('Incorrect Password');
        user.password=newPassword;
        await user.save();
        response.status(200).json({
            status:'success',
            data:{message:'Password changed successfully'}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.message
        });
    }
};
exports.updateMe=async (request,response)=>{
    try{
        const updateObj=filterObj(request.body);
        const user=await Users.findByIdAndUpdate(request.user._id,updateObj,{new:true,runValidators:true});
        response.status(200).json({status:'success',data:{user}});
    }
    catch (err){
        response.status(500).json({status:'error',err:err.message});
    }
};
exports.updateProgress=async (request,response)=>{
    try{
        const {courseId,courseSubItemId} = request.body;
        const currentUser=request.user;
        let coursesProgress=currentUser.coursesProgress; 
        if(!coursesProgress){
            currentUser.coursesProgress={};
        }
        let currentSubItemProgress=coursesProgress.get(courseId);
        if(!currentSubItemProgress){         
            coursesProgress.set(String(courseId),String(courseSubItemId));
        }
        else{            
            currentSubItemProgress=currentSubItemProgress.concat(' ',String(courseSubItemId));
            coursesProgress.set(String(courseId),String(currentSubItemProgress));
        }
        await currentUser.save();
        response.status(200).json({
            status:'success',
            data:{coursesProgress}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};
exports.deleteMe=async (request,response)=>{
    try{
        await Users.findByIdAndDelete({_id:request.user._id});
        response.status(204).json({
            status:'success',
            message:'User deleted'
        });
    }
    catch(err){response.status(500).json({status:'error',err:err.message});}
};
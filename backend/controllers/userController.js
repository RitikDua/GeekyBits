const Users=require(`${__dirname}/../models/userModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const filterObj=(newDetailsObj)=>{
    const updateObj={},arr=Object.keys(newDetailsObj);
    const updationsAllowed=new Map([['name',true],['email',true],['profilePic',true]]);
    for(let i=0;i<arr.length;i++){
        if(updationsAllowed.has(arr[i]))    
            updateObj[arr[i]]=newDetailsObj[arr[i]];
    };
    return updateObj;
};
exports.getUsers=catchAsyncError(async (request,response,next)=>{    
        const users=await Users.find().lean();
        response.status(200).json({
            status:'success',
            data:{users}
        });
});
exports.getUserById=catchAsyncError(async (request,response,next)=>{    
        const userId=request.params.userId;
        const user=await Users.findById(userId).lean();
        response.status(200).json({
            status:'success',
            data:{user}
        });
});
exports.changePassword=catchAsyncError(async (request,response,next)=>{    
        const {currentPassword,newPassword} =request.body;
        const user=await Users.findById(request.user._id).select('+password');
        if(!user)
            return next(new AppError('User does\'nt exist',400));
        if(!await user.isPasswordValid(currentPassword,user.password))
            return next(new AppError('Incorrect Password',401));
        user.password=newPassword;
        await user.save();
        response.status(200).json({
            status:'success',
            data:{message:'Password changed successfully'}
        });
});
exports.updateMe=catchAsyncError(async (request,response,next)=>{    
        const updateObj=filterObj(request.body);
        const user=await Users.findByIdAndUpdate(request.user._id,updateObj,{new:true,runValidators:true});
        response.status(200).json({status:'success',data:{user}});
});
exports.deleteMe=catchAsyncError(async (request,response,next)=>{    
        await Users.findByIdAndDelete({_id:request.user._id});
        response.status(204).json({
            status:'success',
            message:'User deleted'
        });
});
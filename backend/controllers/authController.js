const {promisify}=require('util');
const jwt=require('jsonwebtoken');
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const Users= require(`${__dirname}/../models/userModel`);
exports.sendToken=(id,user,statusCode,request,response,isTest=false)=>{
    const token =jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIREIN});
    if(isTest) return token;
    const cookieOptions={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRESIN*24*3600*1000),
        httpOnly:true,
        secure:request.secure||request.headers['x-forwarded-proto']==='https'
    };
    if(user)
        user.password=undefined;
    response.cookie('jwt',token,cookieOptions);
    response.status(statusCode).json({
        status:'success',
        data:{
            token,user
        }
    });
};
exports.protect=catchAsyncError(async (request,response,next)=>{
    let token;
    //Get Token and check if it's there
    if(request.headers.authorization&&request.headers.authorization.startsWith('Bearer'))
        token=request.headers.authorization.split(' ')[1]; 
    else if(request.cookies.jwt)
        token=request.cookies.jwt;   
    if(!token)
        return next(new AppError('You are not logged in!!..Please login to get access.',401));
    //Verify the token and check if it is manipulated or not            
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY);            
    //decoded:-this will return the payload of user to whom the token was alloted which contains the user's id.
    //Now,Check if user still exists or not 
    const currentUser=await Users.findById(decoded.id);
    if(!currentUser)
        return next(new AppError('The user belonging to this token no longer exist.',400));
    //Now,check if user changed his password after ...allotment of JWT or not...if yes..then deny the accesss     
    // if(currentUser.isPasswordChanged(decoded.iat*1000))
    //     return response.status(401).json({status:'error',message:'User recently changed password! Please log in again.'});
    request.user=currentUser;
    next();
});
exports.login =catchAsyncError(async (request,response,next)=>{
    const {email,password}=request.body;
    if(!email || !password)
        return next(new AppError('Please provide email and password',400));
    const user=await Users.findOne({email}).select('+password');
    if(!user||!await user.isPasswordValid(password,user.password))
        return next(new AppError('Incorrect email or password',401));        
    return exports.sendToken(user._id,user,200,request,response);    
});
exports.logout =catchAsyncError(async (request,response,next)=>{
    response.clearCookie('jwt');
    response.status(200).json({
        status:'success',
        message:'Logged out successfully'
    });    
});
exports.signup =catchAsyncError(async (request,response,next)=>{
    const userDetails={
        name:request.body.name,
        email:request.body.email,
        password:request.body.password
    }
    const user=await Users.create(userDetails);        
    return exports.sendToken(user._id,user,201,request,response);  
});
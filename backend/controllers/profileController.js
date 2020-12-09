const Users = require(`${__dirname}/../models/userModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
exports.profileShortLink =catchAsyncError(async (request, response,next) => {
  const username = request.params.profileShortLink;
  const user = await Users.findOne({ profileShortLink: username });  
  if (!user)
    return next(new AppError('User does not exist',400));
  user.role = undefined;
  user.courses = undefined;
  response.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.getCurrentUser=catchAsyncError(async (request,response,next)=>{    
        const user=request.user;        
        response.status(200).json({
            status:'success',
            data:{user}
        });    
});
exports.changeProfileShortLink =catchAsyncError(async (request, response,next) => {
  const username = request.body.username;
  const user = await Users.findOne({ profileShortLink: username });
  if (user)
    return next(new AppError(`User with username->${username} already exists`,400));
  const currentUser = request.user;
  currentUser.profileShortLink = username;
  await currentUser.save();
  response.status(200).json({
    status: "success",
    data: { currentUser },
  });
});

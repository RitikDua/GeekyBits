const Users = require(`${__dirname}/../models/userModel`);

exports.profileShortLink = async (request, response) => {
  try {
    const username = request.params.profileShortLink;
    const user = await Users.findOne({ profileShortLink: username });
    // console.log(username, user);
    if (!user)
      return response
        .status(400)
        .json({ status: "error", message: "User doesn't exists" });
    user.role = undefined;
    user.courses = undefined;
    response.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      err: err.message,
    });
  }
};

exports.getCurrentUser=async (request,response)=>{
    try{
        const userId=request.user._id;
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
exports.changeProfileShortLink = async (request, response) => {
  try {
    const username = request.body.username;
    const user = await Users.findOne({ profileShortLink: username });
    if (user)
      return response.status(400).json({
        status: "error",
        message: `User with username:${username} already exists`,
      });
    const currentUser = request.user;
    currentUser.profileShortLink = username;
    await currentUser.save();
    response.status(200).json({
      status: "success",
      data: { currentUser },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      err: err.message,
    });
  }
};

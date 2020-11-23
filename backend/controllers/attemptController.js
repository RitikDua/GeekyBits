const Attempts=require(`${__dirname}/../models/attemptModel`);
exports.getAttempts=async (request,response)=>{
    try{
        const attempts=await Attempts.find();
        response.status(200).json({
            status:'success',
            data:{attempts}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.message
        });
    }
};
exports.getAttemptById=async (request,response)=>{
    try{
        const attemptId=request.params.attemptId;
        const attempt=await Attempts.findById(attemptId).populate('problem');
        response.status(200).json({
            status:'success',
            data:{attempt}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            err:err.message
        });
    }
};
exports.submitAttempt=async (request,response)=>{
    const attemptObj={
        attemptType: request.body.attemptType,
        attemptString: request.body.attemptString,
        testCasesPassed: request.body.testCasesPassed,
        testCasesUserOutputs: request.body.testCasesUserOutputs,
        problem: request.body.problemId,
        user: request.body.userId,
      };
    const attempt=await Attempts.create(attemptObj);
    response.status(201).json({
        status:'success',
        data:{attempt}
    });
};
exports.deleteAttempt=async (request,response)=>{
    const attemptId=request.params.attemptId
    await Attempts.findByIdAndDelete(attemptId);
    response.status(204).json({
        status:'success',
        message:'Attempt deleted'
    });
};
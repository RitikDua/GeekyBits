const Contests=require(`${__dirname}/../models/contestModel`);
const CodingProblem=require(`${__dirname}/../models/codingProblemModel`);
const mongoose=require('mongoose');
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const getScore=testCasesPassed=>{
    let totalScore=0;
    testCasesPassed.forEach(testCasePassed=>{
        if(testCasePassed)
            totalScore++;
    });
    return totalScore;
}
exports.getContests=catchAsyncError(async (request,response,next)=>{    
    let filterObj={...request.query};
    if(request.user.role==='user')            
        filterObj.users=request.user._id;
    const contests=await Contests.find(filterObj);
    response.status(200).json({
        status:'success',
        data:{contests}
    });
});
exports.getContestById=catchAsyncError(async (request,response,next)=>{          
    let contestId = request.params.contestId;        
    const contest=await Contests.findById(contestId);
    response.status(200).json({
        status:'success',
        data:{contest}
    })        
});
exports.createContest=catchAsyncError(async (request,response,next)=>{                
    const randomProblem=await CodingProblem.aggregate([{$sample:{size:1}}]);
    const contestObj={users:[request.user._id],problem:randomProblem[0]._id};
    const contest=await Contests.create([contestObj]);        
    const registerUrl=`/contests/${contest[0]._id}`;
    const contestStartUrl=`/contests/${contest[0]._id}/${contest[0].contestUrl}`;        
    response.status(201).json({
        status:'success',            
        data:{registerUrl,contestStartUrl,contestId:contest[0]._id,contestUrl:contest[0].contestUrl}            
    });
});
exports.updateContest=catchAsyncError(async (request,response,next)=>{    
    const contestId=request.params.contestId;
    const {attemptId}=request.body;
    const currentTime=Date.now();
    const contest=await Contests.findById(contestId).populate({
        path:'attempts',
        select:'attemptResult testCasesPassed user'
    });
    if(!mongoose.Types.ObjectId.isValid(contestId))
        return next(new AppError('Not a valid contest-id',400));
    else if(!contest||contest.users.length==0)
        return next(new AppError('No such contest exist',400));
    else if(!contest.users.includes(request.user._id))
        return next(new AppError('You are not allowed access this contest',403));
    else if(currentTime<contest.startedAt)
        return next(new AppError('Contest hasn\'t started yet',400));
    else if(currentTime>contest.endedAt||contest.winner)
        return next(new AppError('Contest has already finished',400));            
    if(!attemptId){    
        if(currentTime<(contest.startedAt.getTime()+30*60000)&&!contest.winner){
            const attempts=contest.attempts;                
            for(const attempt of attempts){
                if(attempt.attemptResult.toLowerCase()==='correct'){                        
                        contest.winner=attempt.user;
                        contest.endedAt=currentTime;
                        break;
                }
            }                
        }
        else if(currentTime>=(contest.startedAt.getTime()+30*60000)&&!contest.winner){
            const attempts=contest.attempts;
            let maxScore,maxScoreUserId;
            for(const attempt of attempts){
                const score=getScore(attempt.testCasePassed);
                if(score>maxScore){
                    maxScore=score;
                    maxScoreUserId=attempt.user;
                }                    
            }
            if(maxScore>0){
                contest.winner=maxScoreUserId;                
                contest.endedAt=currentTime;
            }                    
        }
    }
    else if(!mongoose.Types.ObjectId.isValid(attemptId))
        return next(new AppError('Invalid attempt-id',400));
    else{
        contest.attempts.push(attemptId);
    }
    await contest.save();
    response.status(200).json({
        status:'success',
        data:{contest}
    });    
});
exports.registerParticipant =catchAsyncError(async (request,response,next)=>{
    const contestId=request.params.contestId;
    const newParticipant=request.user._id;
    const contest=await Contests.findById(contestId);
    if(!contest||contest.users.length==0)
        return next(new AppError('No such contest exist',400));
    else if(contest.users.length>1)
        return next(new AppError('The Contest is already full',400));
    else if(contest.users.includes(newParticipant))
        return next(new AppError('You already joined the contest',400));
    contest.users.push(newParticipant);
    contest.startedAt=new Date(new Date().getTime()+5*60000);
    await contest.save();
    response.status(200).json({
        status:'success',
        contestStartUrl:`/contests/${contest._id}/${contest.contestUrl}`   
    });    
});
exports.startContest=catchAsyncError(async (request,response,next)=>{
    const contestId=request.params.contestId,contestUrl=request.params.contestUrl;
    const contest=await Contests.findOne({contestUrl}).populate('problem');
    if(!contest||contest.users.length==0)
        return next(new AppError('No such contest exists',400));
    else if(contest.users.length!=2)
        return next(new AppError('Can\'t start the contest without the other user',400));
    else if(!contest.users.includes(request.user._id))
        return next(new AppError('You are not allowed access this contest',403));
    else if(Date.now()>contest.endedAt)
        return next(new AppError('Contest is already finished',400));     
    else if(contest.winner)       
        return next(new AppError('Winner is already declared',400));
    response.status(200).json({
        status: 'success',
        data:{contest}
    });    
});
exports.deleteContests=catchAsyncError(async (request,response,next)=>{    
    if(request.user.role!=='admin')
        return next(new AppError('You are not authorized to perform this action',403));
    const deleteDetails=request.body;
    await Contests.deleteMany(deleteDetails);
    response.status(204).json({status:'success',message:'Contests deleted'});    
});

const Contests=require(`${__dirname}/../models/contestModel`);
const Attempts=require(`${__dirname}/../models/attemptModel`); 
const CodingProblem=require(`${__dirname}/../models/codingProblemModel`);
const mongoose=require('mongoose');
const getScore=testCasesPassed=>{
    let totalScore=0;
    testCasesPassed.forEach(testCasePassed=>{
        if(testCasePassed)
            totalScore++;
    });
    return totalScore;
}
exports.getContests=async (request,response)=>{
    try{
        let filterObj={...request.query};
        if(request.user.role==='user')            
            filterObj.users=request.user._id;
        const contests=await Contests.find(filterObj);
        response.status(200).json({
            status:'success',
            data:{contests}
        })
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};
exports.getContestById=async (request,response)=>{
    try{        
        let contestId = request.params.contestId;        
        if (!mongoose.Types.ObjectId.isValid(contestId))
            return response.status(404).send("Invalid ID");
        const contest=await Contests.findById(contestId);
        
        if (!contest)
            return response.status(404).send("Contest with given ID not found");
        
        response.status(200).json({
            status:'success',
            data:{contest}
        })
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};
exports.createContest=async (request,response)=>{
    try{                
        const randomProblem=await CodingProblem.aggregate([{$sample:{size:1}}]);
        const contestObj={users:[request.user._id],problem:randomProblem[0]._id};
        
        const contest=await Contests.create([contestObj]);        
        const registerUrl=`/contests/${contest[0]._id}`;
        const contestStartUrl=`/contests/${contest[0]._id}/${contest[0].contestUrl}`;        
        response.status(201).json({
            status:'success',            
            data:{registerUrl,contestStartUrl,contestId:contest[0]._id,contestUrl:contest[0].contestUrl}            
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};
exports.updateContest=async (request,response)=>{
    try{
        const contestId=request.params.contestId;
        const {attemptId}=request.body;
        const currentTime=Date.now();
        const contest=await Contests.findById(contestId).populate({
            path:'attempts',
            select:'attemptResult testCasesPassed user'
        });
        if(!mongoose.Types.ObjectId.isValid(contestId))
            throw new Error('Not a valid contest-id');
        if(!contest||contest.users.length==0)
            throw new Error('No such contest exist');
        else if(!contest.users.includes(request.user._id))
            throw new Error('You are not allowed access this contest');
        else if(currentTime<contest.startedAt)
            throw new Error('Contest hasn\'t started yet');
        else if(currentTime>contest.endedAt)
            throw new Error('Contest has already finished');
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
                    else if(score===maxScore){
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
            throw new Error('Invalid attempt-id');
        else{
            contest.attempts.push(attemptId);
        }
        await contest.save();
        response.status(200).json({
            status:'success',
            data:{contest}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};
exports.registerParticipant =async (request,response)=>{
    try{
        const contestId=request.params.contestId;
        const newParticipant=request.body.userId;
        const contest=await Contests.findById(contestId);
        if(!contest||contest.users.length==0)
            throw new Error('No such contest exist');
        else if(contest.users.length>1)
            throw new Error('The Contest is already full');
        else if(contest.users.includes(newParticipant))
            throw new Error('You already joined the contest');
        contest.users.push(newParticipant);
        contest.startedAt=new Date(new Date().getTime()+5*60000);
        await contest.save();
        response.status(200).json({
            status:'success',
            contestStartUrl:`/contests/${contest._id}/${contest.contestUrl}`   
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};
exports.startContest=async (request,response)=>{
    try{
        const contestId=request.params.contestId,contestUrl=request.params.contestUrl;
        const contest=await Contests.findOne({contestUrl}).populate('problem');
        if(!contest||contest.users.length==0)
            throw new Error('No such contest exists');
        else if(contest.users.length!=2)
            throw new Error('Can\'t start the contest without the other user');
        else if(!contest.users.includes(request.user._id))
            throw new Error('You are not allowed access this contest');
        else if(Date.now()>contest.endedAt)
            throw new Error('Contest is already finished');            
        response.status(200).json({
            status: 'success',
            data:{contest}
        });
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        })
    }
};
exports.deleteContests=async (request,response)=>{
    try{
        if(request.user.role!=='admin')
            return response.status(403).json({status:'error',message:'You are not authorized to perform this action'});
        const deleteDetails=request.body;
        await Contests.deleteMany(deleteDetails);
        response.status(204).json({status:'success',message:'Contests deleted'});
    }
    catch (err){
        response.status(500).json({
            status:'error',
            message:err.message
        });
    }
};

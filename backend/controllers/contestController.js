const Contests=require(`${__dirname}/../models/contestModel`);
const CodingProblem=require(`${__dirname}/../models/codingProblemModel`);
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
        const contest=await Contests.findById(contestId);
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
        const contest=await Contests.findById(contestId);
        if(!contest||contest.users.length==0)
            throw new Error('No such contest exist');
        else if(contest.users.length>1)
            throw new Error('The Contest is already full');
        const newParticipant=request.body.userId;
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
        const contest=await Contest.findOne({contestUrl}).populate('problem');
        if(!contest||contest.users.length==0)
            throw new Error('No such contest exists');
        else if(contest.users.length!=2)
            throw new Error('Can\'t start the contest without the other user');
        else if(!contest.users.includes(request.user._id))
            throw new Error('You are not allowed access this contest');
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
const CodingProblems = require(`${__dirname}/../models/codingProblemModel`);
const Attempts=require(`${__dirname}/../models/attemptModel`);
const {c, cpp, python, java} = require('compile-run');
exports.getAttempts=async (request,response)=>{
    try{
        let filterObj={};
        if(request.user.role==='admin')            
            filterObj=request.body;
        else
            filterObj.user=request.user._id;
        const attempts=await Attempts.find(filterObj);        
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
exports.getAttemptsByProblemId=async (request,response)=>{
    try{
        const filterObj={problem: request.params.problemId};
        if(request.user.role==='user')
            filterObj.user=request.user._id;
        const attempts=await Attempts.find(filterObj);
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
exports.submitAttempt=async (request, response) => {
    try{
        const { problemId,attemptType, attemptString, attemptLanguage,attemptTitle,subItemId,attemptResult } = request.body;//.problemId;
        const attemptObj = {attemptType,attemptString,problem: problemId,user:request.user._id,subItem:subItemId,attemptTitle,attemptResult};
        
        if (attemptType === "CodingProblem") {
            const codingProblem = await CodingProblems.findById(subItemId);
            const { testCases, correctOutput } = codingProblem;            
            let arr = [];
            let testEnv;
            switch (attemptLanguage.toLowerCase()){
                case 'c':testEnv=c;break;
                case 'c++':testEnv=cpp;break;
                case 'java':testEnv=java;break;
                case 'python':testEnv=python;break;
            }
            testCases.forEach(testCase =>{                
                arr.push(testEnv.runSource(attemptString,{stdin:decodeURIComponent(testCase)}))
            });
            const result = await Promise.all(arr);
            arr = [];
            let checkTestCases = [];
            let checkStatus=0,errorType='';
            for (let i = 0; i < result.length; i++) {
                let outcome;     
                // console.log(result[i]);           
                if(result[i].stderr||result[i].signal||result[i].exitCode) {                    
                    errorType = result[i].errorType==='run-time'||result[i].signal?'RuntimeError':'CompilationError';            
                    outcome=false;
                }
                else                    
                    outcome=(result[i].stdout===decodeURIComponent(correctOutput[i]));
                checkStatus+=outcome;
                checkTestCases.push(outcome);
                arr.push(result[i].stdout);
            }            
            attemptObj.attemptResult=errorType?errorType:((checkStatus===result.length)?"Correct":"Wrong");
            attemptObj.testCasesPassed=checkTestCases;
            attemptObj.testCasesUserOutputs=arr;
            attemptObj.attemptLanguage=attemptLanguage;                
        }    
        const attempt = await Attempts.create(attemptObj);                
        response.status(201).json({
            status: "success",
            data: { attempt }
        });                   
    }
    catch (err){        
        console.log(err);
        response.status(500).json({
            status: "error",
            error: err.message
        });                       
    }
}
exports.deleteAttempts=async (request,response)=>{
    if(request.user.role!=='admin')
        return response.status(403).json({status:'error',message:'You are not authorized for this action'});
    const attemptDetails=request.body;
    await Attempts.deleteMany(attemptDetails);
    response.status(204).json({
        status:'success',
        message:'Attempts deleted'
    });
};
const fs = require('fs');
const executeCode = require("../middlewares/CompileCode");
const CodingProblems = require(`${__dirname}/../models/codingProblemModel`);
const Attempts=require(`${__dirname}/../models/attemptModel`);
const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            console.log("SORRY NOT DELETED")
        };
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
}
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
        const { problemId,  attemptType, attemptString, attemptLanguage,attemptTitle,subItemId,attemptResult } = request.body;//.problemId;
        const attemptObj = {attemptType,attemptString,problem: problemId,user:request.user._id,subItem:subItemId,attemptTitle,attemptResult};
        
        if (attemptType === "CodingProblem") {
            const codingProblem = await CodingProblems.findById(subItemId);
            const { testCases, correctOutput } = codingProblem;
            let arr = [];
            let error="";
            // testCases.forEach(testCase => arr.push(executeCode.executeCode(attemptString,testCase)));
           for(let i of testCases){
               const x=executeCode.executeCode(attemptString,i);
               
               x.then((y)=>{
                if(y.err){
                     // console.log("asd");                   
                   // console.log(JSON.stringify(y))
                   error=y.output.cmd.startsWith("gcc")?"compiler error":"runtime error";
               console.log(error);
               }
               
               })
               arr.push(x);
           } 

           
            const result = await Promise.all(arr);
            arr = [];
            let checkTestCases = [];
            let checkStatus=0;
            for (let i = 0; i < result.length; i++) {
                const outcome=(result[i].output === decodeURIComponent(correctOutput[i]));
                checkStatus+=outcome;
                checkTestCases.push(outcome);
                arr.push(result[i].output);
            }
            
            attemptObj.attemptResult=error?error:(checkStatus===result.length)?"correct":"wrong";
            attemptObj.testCasesPassed=checkTestCases;
            attemptObj.testCasesUserOutputs=arr;
            attemptObj.attemptLanguage=attemptLanguage;
            
            deleteFile(`${__dirname}/../input.txt`);
            deleteFile(`${__dirname}/../test.c`);
            deleteFile(`${__dirname}/../a.out`);             
        }    
        const attempt = await Attempts.create(attemptObj);        
        console.log(attempt);
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
        deleteFile(`${__dirname}/../input.txt`);
        deleteFile(`${__dirname}/../test.c`);
        deleteFile(`${__dirname}/../a.out`);   
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
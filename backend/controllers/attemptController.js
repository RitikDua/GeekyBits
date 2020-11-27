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
        let filterObj={...request.query};
        if(request.user.role==='user')                        
            filterObj.user=request.user._id;
        const attempts=await Attempts.find(filterObj).sort();        
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
        const attempts=await Attempts.find(filterObj).sort();
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
        const { problemId, userId, attemptType, attemptString, attemptLanguage,attemptTitle,subItemId } = request.body;//.problemId;
        const attemptObj = {attemptType,attemptString,problem: problemId,user: userId,subItem:subItemId,attemptTitle};
        if (attemptType === "CodingProblem") {
            const codingProblem = await CodingProblems.findById(subItemId);
            const { testCases, correctOutput } = codingProblem;
            let arr = [];
            testCases.forEach(testCase => arr.push(executeCode.executeCode(attemptString,testCase)));
            
            const result = await Promise.all(arr);
            arr = [];
            let checkTestCases = [];
            for (let i = 0; i < result.length; i++) {
                checkTestCases.push(result[i].output === decodeURIComponent(correctOutput[i]));
                arr.push(result[i].output);
            }
            attemptObj.testCasesPassed=checkTestCases;
            attemptObj.testCasesUserOutputs=arr;
            attemptObj.attemptLanguage=attemptLanguage;
            // attemptObj.attemptTitle=attemptTitle;
            // attemptObj.subItemId=problemId;
            deleteFile(`${__dirname}/../input.txt`);
            deleteFile(`${__dirname}/../test.c`);
            deleteFile(`${__dirname}/../a.exe`);             
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
        deleteFile(`${__dirname}/../input.txt`);
        deleteFile(`${__dirname}/../test.c`);
        deleteFile(`${__dirname}/../a.exe`);   
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
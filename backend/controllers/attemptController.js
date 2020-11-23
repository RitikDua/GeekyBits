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
exports.submitAttempt=async (request, response) => {
    try{
        const { problemId, userId, attemptType, attemptString, lang } = request.body;//.problemId;
        const attemptObj = {attemptType,attemptString,problem: problemId,user: userId};
        if (attemptType === "CodingProblem") {
            const codingProblem = await CodingProblems.findById(problemId);
            const { testCases, correctOutput } = codingProblem;
            let arr = [];
            testCases.forEach(testCase => arr.push(executeCode.executeCode(attemptString,testCase)));
            //    for(let i of testCases){
            // 	arr.push(executeCode.executeCode(code,i));
            // }
            const result = await Promise.all(arr);
            // console.log(codingProblem);
            arr = [];
            let checkTestCases = [];
            for (let i = 0; i < result.length; i++) {
                checkTestCases.push(result[i].output === decodeURIComponent(correctOutput[i]));
                arr.push(result[i].output);
            }
            attemptObj.testCasesPassed=checkTestCases;
            attemptObj.testCasesUserOutputs=arr;
            attemptObj.attemptLanguage=lang;
            deleteFile(`${__dirname}/../input.txt`);
            deleteFile(`${__dirname}/../test.c`);
            deleteFile(`${__dirname}/../a.out`);             
        }	
        const attempt = await Attempts.create(attemptObj);        
        response.status(201).json({
            status: "success",
            data: { attempt }
        });           
    }
    catch (err){        
        response.status(500).json({
            status: "error",
            error: err.message
        });     
        deleteFile(`${__dirname}/../input.txt`);
        deleteFile(`${__dirname}/../test.c`);
        deleteFile(`${__dirname}/../a.out`);   
    }
}
exports.deleteAttempt=async (request,response)=>{
    const attemptId=request.params.attemptId
    await Attempts.findByIdAndDelete(attemptId);
    response.status(204).json({
        status:'success',
        message:'Attempt deleted'
    });
};
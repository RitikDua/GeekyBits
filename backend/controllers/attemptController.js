const CodingProblems = require(`${__dirname}/../models/codingProblemModel`);
const { updateProgress } = require(`${__dirname}/../utils/updateProgress`);
const catchAsyncError = require(`${__dirname}/../utils/catchAsyncError`);
const executeCode = require(`${__dirname}/../middlewares/CompileCode`);
const Attempts = require(`${__dirname}/../models/attemptModel`);
const AppError = require(`${__dirname}/../utils/AppError`);
const axios = require('axios');
const { c, cpp, python, java } = require("compile-run");
const mongoose = require("mongoose");

const deleteFile = (filename) => {
  fs.unlink(filename, function (err) {
    if (err) {
      console.log("SORRY NOT DELETED");
    }
    // if no error, file has been deleted successfully
    console.log("File deleted!");
  });
};
exports.getAttempts = catchAsyncError(async (request, response, next) => {
  let filterObj = {};
  if (request.user.role === "admin") filterObj = request.body;
  else filterObj.user = request.user._id;
  const attempts = await Attempts.find(filterObj).sort({ createdAt: -1 }).lean();
  response.status(200).json({
    status: "success",
    data: { attempts },
  });
});
exports.getAttemptsByProblemId = catchAsyncError(
  async (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.problemId))
      return next(new AppError("Invalid ID", 400));

    const filterObj = { problem: request.params.problemId };
    if (request.user.role === "user") filterObj.user = request.user._id;
    const attempts = await Attempts.find(filterObj).sort({ createdAt: -1 }).lean();
    response.status(200).json({
      status: "success",
      data: { attempts },
    });
  }
);
exports.submitAttempt = catchAsyncError(async (request, response, next) => {
  const {
    problemId,
    attemptType,
    attemptString,
    attemptLanguage,
    attemptTitle,
    subItemId,
    attemptResult,
    courseId,
  } = request.body; //.problemId;
  const attemptObj = {
    attemptType,
    attemptString,
    problem: problemId,
    user: request.user._id,
    subItem: subItemId,
    attemptTitle,
    attemptResult,
  };
  if (attemptType === "CodingProblem") {
    const codingProblem = await CodingProblems.findById(subItemId);
    const { testCases, correctOutput } = codingProblem;
    let arr = [];
    let testEnv,options={};
    switch (attemptLanguage.toLowerCase()) {
      case "c":
        testEnv = c;
        break;
      case "cpp":
        testEnv = cpp;
        break;
      case "java":
        testEnv = java;
        break;
      case "python":
        {testEnv = python;options.executionPath ='python3';}
        break;
    }
    testCases.forEach((testCase) => {
      options.stdin=decodeURIComponent(testCase);
      arr.push(
        testEnv.runSource(decodeURIComponent(attemptString),options)
      );
    });
    // let error="";
    // testCases.forEach(testCase => arr.push(executeCode.executeCode(attemptString,testCase)));
    //    for(let i of testCases){
    //        const x=executeCode.executeCode(attemptString,i);

    //        x.then((y)=>{
    //         if(y.err){
    // console.log("asd");
    // console.log(JSON.stringify(y))
    //            error=y.output.cmd.startsWith("gcc")?"compiler error":"runtime error";
    //        console.log(error);
    //        }

    //        })
    //        arr.push(x);
    //    }

    const result = await Promise.all(arr);
    arr = [];
    let checkTestCases = [];
    let checkStatus = 0,
      errorType = "";
    for (let i = 0; i < result.length; i++) {
      let outcome;
      // console.log(result[i]);
      if (result[i].stderr || result[i].signal || result[i].exitCode) {
        errorType =
          result[i].errorType === "run-time" || result[i].signal
            ? "runtime error"
            : "compiler error";
        outcome = false;
      } else
        outcome = result[i].stdout === decodeURIComponent(correctOutput[i]);
      // const outcome=(result[i].output===decodeURIComponent(correctOutput[i]));
      checkStatus += outcome;
      checkTestCases.push(outcome);
      arr.push(result[i].stdout ? result[i].stdout : `${result[i].errorType}\n${result[i].stderr}\nError: ${result[i].signal} with exit code ${result[i].exitCode}`);
    }
    //     arr.push(result[i].output);
    // }
    attemptObj.attemptResult = errorType
      ? errorType
      : checkStatus === result.length
      ? "correct"
      : "wrong";
    // attemptObj.attemptResult=error?error:(checkStatus===result.length)?"correct":"wrong";
    attemptObj.testCasesPassed = checkTestCases;
    attemptObj.testCasesUserOutputs = arr;
    attemptObj.attemptLanguage = attemptLanguage;
    // deleteFile(`${__dirname}/../input.txt`);
    // deleteFile(`${__dirname}/../test.c`);
    // deleteFile(`${__dirname}/../a.out`);
  }
  if (courseId && attemptObj.attemptResult === "correct") {
    updateProgress(courseId, problemId, request.user);
  }
  const attempt = await Attempts.create(attemptObj);
  response.status(201).json({
    status: "success",
    data: { attempt },
  });
});
exports.deleteAttempts = async (request, response, next) => {
  if (request.user.role !== "admin")
    return next(new AppError("You are not authorized for this action", 403));
  const attemptDetails = request.body;
  await Attempts.deleteMany(attemptDetails);
  response.status(204).json({
    status: "success",
    message: "Attempts deleted",
  });
};

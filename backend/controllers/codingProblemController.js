const CodingProblems = require(`${__dirname}/../models/codingProblemModel`);
const mongoose = require("mongoose");
const {matchBodyWithSchema}=require("../utils/matchBodyWithSchema");
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
exports.getCodingProblems =catchAsyncError(async (request, response,next) => {  
    const codingProblems = await CodingProblems.find();
    response.status(200).json({
      status: "success",
      data: { codingProblems },
    });
});
exports.getCodingProblemById =catchAsyncError(async (request, response,next) => {  
    if (!mongoose.Types.ObjectId.isValid(request.params.codingProblemId))
      return next(new AppError("Invalid ID",400));
    const codingProblem = await CodingProblems.findById(
      request.params.codingProblemId
    );
    if (!codingProblem)
      return next(new AppError("Problem with given ID not found",400));

    response.status(200).json({
      status: "success",
      data: { codingProblem },
    });
});
exports.createCodingProblem =catchAsyncError(async (request, response,next) => {  
    const codingProblemDetails = request.body;
    const status = matchBodyWithSchema(Object.keys(codingProblemDetails), [
      "problemTitle",
      "problemStatement",
      "testCases",
      "correctOutput",
    ]);
    if (!status)
      return next(new AppError("Please provide all coding problem details",400));
    const codingProblem = await CodingProblems.create(codingProblemDetails);
    response.status(201).json({
      status: "success",
      data: { codingProblem },
    });
});

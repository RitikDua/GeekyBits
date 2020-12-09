const MCQs = require(`${__dirname}/../models/mcqModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const { matchBodyWithSchema } = require("../utils/matchBodyWithSchema");
exports.getMCQs = catchAsyncError(async (request, response,next) => {
    const mcqs = await MCQs.find();
    response.status(200).json({
      status: "success",
      data: { mcqs },
    });
});
exports.getMCQById =catchAsyncError(async (request, response,next) => {
  const mcqId = request.params.mcqId;
  if (!mcqId) return next(new AppError("Please provide a valid id",400));
  const mcq = await MCQs.findById(mcqId);
  response.status(200).json({
    status: "success",
    data: { mcq },
  });
});
exports.createMCQ =catchAsyncError(async (request, response,next) => {  
  const mcqDetails = request.body;
  if (!matchBodyWithSchema(Object.keys(mcqDetails), ["mcqTitle","mcqStatement","options","answer"]))
    return next(new AppError("Please provide mcq Detail",400));
  const mcq = await MCQs.create(mcqDetails);
  response.status(201).json({
    status: "success",
    data: { mcq },
  });
});

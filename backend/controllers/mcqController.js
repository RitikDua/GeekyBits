const catchAsyncError = require(`${__dirname}/../utils/catchAsyncError`);
const { matchBodyWithSchema } = require("../utils/matchBodyWithSchema");
const AppError = require(`${__dirname}/../utils/AppError`);
const MCQs = require(`${__dirname}/../models/mcqModel`);
const mongoose = require("mongoose");

exports.getMCQs = catchAsyncError(async (request, response, next) => {
  const mcqs = await MCQs.find().lean();
  response.status(200).json({
    status: "success",
    data: { mcqs },
  });
});
exports.getMCQById = catchAsyncError(async (request, response, next) => {
  const mcqId = request.params.mcqId;
  if (!mongoose.Types.ObjectId.isValid(mcqId))
    return next(new AppError("Invalid ID", 400));

  const mcq = await MCQs.findById(mcqId).lean();
  if (!mcq) return next(new AppError("MCQ with given ID not found", 404));

  response.status(200).json({
    status: "success",
    data: { mcq },
  });
});
exports.createMCQ = catchAsyncError(async (request, response, next) => {
  const mcqDetails = request.body;
  if (
    !matchBodyWithSchema(Object.keys(mcqDetails), [
      "mcqTitle",
      "mcqStatement",
      "options",
      "answer",
    ])
  )
    return next(new AppError("Please provide mcq Detail", 400));
  const mcq = await MCQs.create(mcqDetails);
  response.status(201).json({
    status: "success",
    data: { mcq },
  });
});

const Tutorials = require(`${__dirname}/../models/tutorialModel`);
const catchAsyncError = require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const { matchBodyWithSchema } = require(`${__dirname}/../utils/matchBodyWithSchema`);
const mongoose = require("mongoose");

exports.getTutorials = catchAsyncError(async (request, response, next) => {
  const tutorials = await Tutorials.find();
  response.status(200).json({
    status: "success",
    data: { tutorials },
  });
});
exports.getTutorialById = catchAsyncError(async (request, response, next) => {
  const tutorialId = request.params.tutorialId;
  if (!mongoose.Types.ObjectId.isValid(tutorialId))
    return next(new AppError("Invalid ID", 400));

  const tutorial = await Tutorials.findById(tutorialId);
  if (!tutorial)
    return next(new AppError("Tutorial with given ID not found", 404));

  response.status(200).json({
    status: "success",
    data: { tutorial },
  });
});
exports.createTutorial = catchAsyncError(async (request, response, next) => {
  const tutorialDetails = request.body;
  if (
    !matchBodyWithSchema(Object.keys(tutorialDetails), [
      "tutorialTitle",
      "content",
      "codes",
    ])
  )
    return next(new AppError("Please provide tutorial details", 400));
  const tutorial = await Tutorials.create(tutorialDetails);
  response.status(201).json({
    status: "success",
    data: { tutorial },
  });
});

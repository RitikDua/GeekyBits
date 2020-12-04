const MCQs = require(`${__dirname}/../models/mcqModel`);
const { matchBodyWithSchema } = require("../utils/matchBodyWithSchema");
const mongoose = require("mongoose");

exports.getMCQs = async (request, response) => {
  try {
    const mcqs = await MCQs.find();
    response.status(200).json({
      status: "success",
      data: { mcqs },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message,
      err,
    });
  }
};
exports.getMCQById = async (request, response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.mcqId))
      return response.status(404).send("Invalid ID");

    const mcq = await MCQs.findById(request.params.mcqId);

    if (!mcq) return response.status(404).send("MCQ with given ID not found");

    response.status(200).json({
      status: "success",
      data: { mcq },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message,
      err,
    });
  }
};
exports.createMCQ = async (request, response) => {
  try {
    const mcqDetails = request.body;
    if (
      !matchBodyWithSchema(Object.keys(mcqDetails), [
        "mcqTitle",
        "mcqStatement",
        "options",
        "answer",
      ])
    )
      return response.status(400).send("Please provide mcq Detail ");
    const mcq = await MCQs.create(mcqDetails);
    response.status(201).json({
      status: "success",
      data: { mcq },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message,
      err,
    });
  }
};

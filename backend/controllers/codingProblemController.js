const CodingProblems = require(`${__dirname}/../models/codingProblemModel`);
const mongoose = require("mongoose");

exports.getCodingProblems = async (request, response) => {
  try {
    const codingProblems = await CodingProblems.find();
    response.status(200).json({
      status: "success",
      data: { codingProblems },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message,
      err,
    });
  }
};
exports.getCodingProblemById = async (request, response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.codingProblemId))
      return response.status(404).send("Invalid ID");

    const codingProblem = await CodingProblems.findById(
      request.params.codingProblemId
    );

    if (!codingProblem)
      return response.status(404).send("Problem with given ID not found");

    response.status(200).json({
      status: "success",
      data: { codingProblem },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message,
      err,
    });
  }
};
exports.createCodingProblem = async (request, response) => {
  try {
    const codingProblemDetails = request.body;
    // console.log(codingProblemDetails);
    if (!codingProblemDetails)
      throw new Error("Please provide a coding problem");
    const codingProblem = await CodingProblems.create(codingProblemDetails);
    response.status(201).json({
      status: "success",
      data: { codingProblem },
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message,
      err,
    });
  }
};

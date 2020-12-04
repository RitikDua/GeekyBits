const MCQs = require(`${__dirname}/../models/mcqModel`);
const { matchBodyWithSchema } = require("../utils/matchBodyWithSchema");
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
    const mcqId = request.params.mcqId;
    if (!mcqId) throw new Error("Please provide a valid id");
    const mcq = await MCQs.findById(mcqId);
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

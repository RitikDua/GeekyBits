const { Attempt } = require(`${__dirname}/../models/attemptsModel`);
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const attemptObject = {
      attemptType: req.body.attemptType,
      attemptString: req.body.attemptString,
      attemptResultDetails: {
        testCasesPassed: req.body.testCasesPassed,
        testCasesUserOutputs: req.body.testCasesUserOutputs,
      },
      problem: req.body.problemId,
      user: req.body.userId,
    };
    const attempt = await Attempt.create(attemptObject);
    console.log(attempt);
    res.status(201).json({
      status: "success",
      data: attempt,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err: err.message,
    });
  }
});
module.exports = router;

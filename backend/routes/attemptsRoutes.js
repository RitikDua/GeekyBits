const mongoose = require("mongoose");
const express = require("express");
// const request = require("request");
const axios = require("axios");
const { Attempt } = require(`${__dirname}/../models/attemptsModel`);
const router = express.Router();

router.post("/", async (req, res) => {
  const code = decodeURIComponent(req.body.script);
  var program = {
    script: code,
    language: req.body.language,
    versionIndex: "3",
    clientId: process.env.JDOODLE_CLIENT_KEY,
    clientSecret: process.env.JDOODLE_SERVER_KEY,
  };
  // console.log(program);
  try {
    const { data } = await axios({
      method: "POST",
      url: "https://api.jdoodle.com/v1/execute",
      data: program,
    });
    console.log(data);
    res.status(200).json({
      status: "success",
      output: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
  // request(
  //   {
  //     url: "https://api.jdoodle.com/v1/execute",
  //     method: "POST",
  //     json: program,
  //   },
  //   async (error, response) => {
  //     const op = response.body.output;
  //     attemptResultSchema;

  //     return res.status(201).send(op);
  //   }
  // );
});

module.exports = router;

const { clientId, clientSecret } = require("../config/jdoodleApi");
const mongoose = require("mongoose");
const express = require("express");
const request = require("request");
const { Attempt } = require("../models/attemptsModel");
const router = express.Router();

router.post("/", (req, res) => {
  const code = decodeURIComponent(req.body.script);
  var program = {
    script: code,
    language: req.body.language,
    versionIndex: "3",
    clientId,
    clientSecret,
  };

  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program,
    },
    async (error, response) => {
      const op = response.body.output;
    //   const attempt = new Attempt({

    //   });

      return res.status(201).send(op);
    }
  );
});

module.exports = router;

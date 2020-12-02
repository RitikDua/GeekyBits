const express = require('express');
const router=express.Router();
const Stats=require("../controllers/statsController");

router.route('/count')
	  .get(Stats.countAttempts);

router.route("/user/accuracy")
	   .get(Stats.getAttemptsAccuracy);
module.exports=router;

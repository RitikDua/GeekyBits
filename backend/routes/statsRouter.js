const express = require('express');
const router=express.Router();
const Stats=require("../controllers/statsController");

router.route('/count')
	  .get(Stats.countAttempts);

router.route("/user/accuracy")
	   .get(Stats.getAttemptsAccuracy);

router.route("/user/month")
	   .get(Stats.getMonthData);

router.route("/user/dateRange")
	   .get(Stats.getData)
module.exports=router;

const express = require('express');
const router=express.Router();
const Stats=require("../controllers/statsController");
const authController=require(`${__dirname}/../controllers/authController`);

router.use(authController.protect);

router.route('/count')
	  .get(Stats.countAttempts);

router.route("/user/accuracy")
	   .get(Stats.getAttemptsAccuracy);

router.route("/user/month")
	   .get(Stats.getMonthData);

router.route("/user/dateRange")
	   .get(Stats.getData)

router.route("/user/lastweek")
	   .get(Stats.getLastWeekData)

router.route("/user/attempts")
		.get(Stats.getAttemptsData);
module.exports=router;

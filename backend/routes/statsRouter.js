const express = require('express');
const router=express.Router();
const Stats=require("../controllers/statsController");

router.route('/count')
	  .get(Stats.countAttempts);

module.exports=router;

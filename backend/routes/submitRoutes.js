const express = require('express');
const router=express.Router();
const submitController=require(`${__dirname}/../controllers/submitController`);

// router.route('/')
// .get(tutorialController.getTutorials);

router.route('/')
.post(submitController.submit);

module.exports=router;
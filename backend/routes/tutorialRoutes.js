const express = require('express');
const router=express.Router();
const tutorialController=require(`${__dirname}/../controllers/tutorialController`);
router.route('/')
.get(tutorialController.getTutorials);
router.route('/:tutorialId')
.get(tutorialController.getTutorialById);
module.exports=router;
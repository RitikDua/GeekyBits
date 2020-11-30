const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const tutorialController=require(`${__dirname}/../controllers/tutorialController`);
router.use(authController.protect);
router.route('/')
.get(tutorialController.getTutorials)
.post(tutorialController.createTutorial);
router.route('/:tutorialId')
.get(tutorialController.getTutorialById);
module.exports=router;
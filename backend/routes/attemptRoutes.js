const express = require("express");
const router = express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const attemptController =require(`${__dirname}/../controllers/attemptController`);
router.use(authController.protect);
router.route('/')
.get(attemptController.getAttempts)
.post(attemptController.submitAttempt)
.delete(attemptController.deleteAttempts);
router.route('/:problemId')
.get(attemptController.getAttemptsByProblemId)
module.exports=router;
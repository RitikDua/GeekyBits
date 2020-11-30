const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const codingProblemController=require(`${__dirname}/../controllers/codingProblemController`);
router.use(authController.protect);
router.route('/')
.get(codingProblemController.getCodingProblems)
.post(codingProblemController.createCodingProblem);
router.route('/:codingProblemId')
.get(codingProblemController.getCodingProblemById);
module.exports=router;
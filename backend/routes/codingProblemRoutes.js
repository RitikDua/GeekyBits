const express = require('express');
const router=express.Router();
const codingProblemController=require(`${__dirname}/../controllers/codingProblemController`);
router.route('/')
.get(codingProblemController.getCodingProblems);
router.route('/:codingProblemId')
.get(codingProblemController.getCodingProblemById);
module.exports=router;
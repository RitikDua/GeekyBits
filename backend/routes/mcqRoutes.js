const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const mcqController=require(`${__dirname}/../controllers/mcqController`);
router.use(authController.protect);
router.route('/')
.get(mcqController.getMCQs)
.post(mcqController.createMCQ);
router.route('/:mcqId')
.get(mcqController.getMCQById);
module.exports=router;

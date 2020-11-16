const express = require('express');
const router=express.Router();
const mcqController=require(`${__dirname}/../controllers/mcqController`);
router.route('/')
.get(mcqController.getMCQs);
router.route('/:mcqId')
.get(mcqController.getMCQById);
module.exports=router;

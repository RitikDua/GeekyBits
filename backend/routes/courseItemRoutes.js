const express = require('express');
const router=express.Router();
const courseItemController=require(`${__dirname}/../controllers/courseItemController`);
router.route('/')
.get(courseItemController.getAllCourseItems);
router.route('/:courseItemId')
.get(courseItemController.getCourseItemById);
module.exports=router;
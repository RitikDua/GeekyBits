const express = require('express');
const router=express.Router();
const courseSubItemController=require(`${__dirname}/../controllers/courseSubItemController`);
router.route('/')
.get(courseSubItemController.getAllCourseSubItems);
router.route('/:courseSubItemId')
.get(courseSubItemController.getCourseSubItemById);
module.exports=router;
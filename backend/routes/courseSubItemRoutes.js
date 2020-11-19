const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const courseSubItemController=require(`${__dirname}/../controllers/courseSubItemController`);
router.use(authController.protect);
router.route('/')
.get(courseSubItemController.getAllCourseSubItems);
router.route('/:courseSubItemId')
.get(courseSubItemController.getCourseSubItemById);
module.exports=router;
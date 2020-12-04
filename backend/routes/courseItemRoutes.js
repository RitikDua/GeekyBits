const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const courseItemController=require(`${__dirname}/../controllers/courseItemController`);
router.use(authController.protect);
router.route('/')
.get(courseItemController.getCourseItems)
.post(courseItemController.createCourseItem);
router.route('/:courseItemId')
.get(courseItemController.getCourseItemById);
module.exports=router;

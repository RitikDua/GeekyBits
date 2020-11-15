const express = require('express');
const router=express.Router();
const courseController=require(`${__dirname}/../controllers/courseController`);
router.route('/')
.get(courseController.getAllCourses);
router.route('/:courseId')
.get(courseController.getCourseById);
module.exports=router;
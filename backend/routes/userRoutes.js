const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/signup',authController.signup);
module.exports=router;
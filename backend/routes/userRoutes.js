const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const userController=require(`${__dirname}/../controllers/userController`);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/signup',authController.signup);
router.use(authController.protect);
router.get('/',userController.getUsers);

router.get('/profile',userController.getUserById);

router.patch('/changePassword',userController.changePassword);
router.patch('/updateMe',userController.updateMe);
router.delete('/deleteMe',userController.deleteMe);
module.exports=router;
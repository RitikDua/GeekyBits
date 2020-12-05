const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const profileController=require(`${__dirname}/../controllers/profileController`);
router.use(authController.protect);
router.get('/:profileShortLink',profileController.profileShortLink);
router.patch('/',profileController.changeProfileShortLink);
router.get("/",profileController.getCurrentUser);
module.exports=router;
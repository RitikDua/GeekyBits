const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const profileController=require(`${__dirname}/../controllers/profileController`);
router.use(authController.protect);
router.get('/:profileShortLink',profileController.profileShortLink);
router.patch('/',authController.protect,profileController.changeProfileShortLink);
module.exports=router;
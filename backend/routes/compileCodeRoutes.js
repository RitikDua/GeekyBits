const express = require("express");
const router = express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const attemptController =require(`${__dirname}/../controllers/attemptController`);
const compileCodeController=require(`${__dirname}/../controllers/compileCodeController`);
// router.use(authController.protect);

router.route('/')
.post(compileCodeController.compileCode);

module.exports=router;
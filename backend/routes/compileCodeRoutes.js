const express = require("express");
const router = express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const compileCodeController=require(`${__dirname}/../controllers/compileCodeController`);
router.use(authController.protect);
router.route('/')
.post(compileCodeController.codeCompile);

module.exports=router;
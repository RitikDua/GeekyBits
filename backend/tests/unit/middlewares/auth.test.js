require('dotenv').config();
const {sendToken} = require('./../../../controllers/authController');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const User = require('./../../../models/userModel');

describe('generate Auth Token',()=>{
    it('should return a valid JWT',()=>{
        const newId = {"id":{_id : new mongoose.Types.ObjectId().toHexString()}};
        const user = new User(newId);
        const token = sendToken(newId,user,201,null,null,true);
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        expect(decoded.id).toMatchObject(newId);
    });
});
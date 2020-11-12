const express = require('express');
const router=express.Router();
const tutFile=require(`${__dirname}/../dev-data/tutorials.json`);
router.route('/')
.get((request, response) => {
    response.status(200).json(tutFile);
});
router.route('/:tutId')
.get((request, response) => {
    const object=tutFile.find(obj=>{
        return obj._id===parseInt(request.params.tutId);
    });
    response.status(200).json(object);
});
module.exports=router;
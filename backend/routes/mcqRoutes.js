const express = require('express');
const router=express.Router();
const mcqFile=require(`${__dirname}/../dev-data/mcqs.json`);
router.route('/')
.get((request, response) => {
    response.status(200).json(mcqFile);
});
router.route('/:mcqId')
.get((request, response) => {
    const object=mcqFile.find(obj=>{
        return obj._id===parseInt(request.params.mcqId);
    });
    response.status(200).json(object);
});
module.exports=router;

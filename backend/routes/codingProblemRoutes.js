const express = require('express');
const router=express.Router();
const codingProblemFile=require(`${__dirname}/../dev-data/codingProblems.json`);
router.route('/')
.get((request, response) => {
    response.status(200).json(codingProblemFile);
});
router.route('/:codingproblemId')
.get((request, response) => {
    const object=codingProblemFile.find(obj=>{
        return obj._id===parseInt(request.params.codingproblemId);
    });
    response.status(200).json(object);
});
module.exports=router;
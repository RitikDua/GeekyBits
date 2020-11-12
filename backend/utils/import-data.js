const fs=require('fs').promises;
const mongoose=require('mongoose');
require('dotenv').config();
const Tutorial=require(`${__dirname}/../models/tutorialModel`);
const MCQ=require(`${__dirname}/../models/mcqModel`);
const CodingProblem=require(`${__dirname}/../models/codingproblemModel`);
mongoose.connect(process.env.DB_CLOUD,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true}).then(()=>console.log('Connected to Database successfully')).catch(err=>console.log('Some error occured while connecting to DB...'));
let tutorials,mcqs,codingProblems;
const fetchJsons=async ()=>{
    let data=await Promise.all([fs.readFile(`${__dirname}/../dev-data/tutorials.json`),fs.readFile(`${__dirname}/../dev-data/mcqs.json`),fs.readFile(`${__dirname}/../dev-data/codingProblems.json`)]);
    tutorials=JSON.parse(data[0]);
    mcqs=JSON.parse(data[1]);
    codingProblems=JSON.parse(data[2]);
    // console.log(tutorials,mcqs,codingProblems);
};
const importData=async()=>{
    try{
        await Promise.all([Tutorial.create(tutorials),MCQ.create(mcqs),CodingProblem.create(codingProblems)]);
        console.log('Data loaded successfully');
    }    
    catch(err){
        console.log(err);
    }
    process.exit();
};
const deleteData=async()=>{
    try{
        await Promise.all([Tutorial.deleteMany(),MCQ.deleteMany(),CodingProblem.deleteMany()])
        console.log('Data deleted successfully');
    }    
    catch(err){
        console.log(err);
    }
    process.exit();
};
async function startOperations(dbActivity){
    await fetchJsons();
    dbActivity();
}

if(process.argv[2]==='--import')
    startOperations(importData);
else if(process.argv[2]==='--delete')
    startOperations(deleteData);
else{
    console.log('Give two args only either --import or --delete');    
    process.exit();
}
    
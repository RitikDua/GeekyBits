const executeCode=require("../middlewares/CompileCode");
const CodingProblems=require(`${__dirname}/../models/codingProblemModel`);
const Attempts=require(`${__dirname}/../models/attemptModel`);

exports.submit=async (request,response)=>{
	const problemId=request.body.problemId;
	const userId=request.body.userId;
	const problemType=request.body.problemType;
	const code=request.body.code;
	const lang=request.body.lang;
	//submit Code
	if(problemType==="code")
	{
        const codingProblem=await CodingProblems.findById(problemId);
       	const testCases=codingProblem.testCases;
       	const correctOutput=codingProblem.correctOutput;
       	let arr=[]
       	for(let i of testCases){
       		arr.push(executeCode.executeCode(code,i));
       	}
       	const result=await Promise.all(arr);
       	console.log(codingProblem);
       	arr=[];
       	let checkArr=[];
       	for(let i=0;i<result.length;i++)
       	{
       		checkArr.push(result[i].output===decodeURIComponent(result[i]));
       		arr.push(result[i].output);	
       	}

		const attemptObj={
		    attemptType: problemType,
		    attemptString: "coding",
		    testCasesPassed: checkArr,
		    testCasesUserOutputs: arr,
		    problem: problemId,
		    user: userId,
		  };
		const attempt=await Attempts.create(attemptObj);

        response.status(201).json({
        	status:"success",
        	data:{attempt}
        })

	}	
	//submit mcqs
	else{
		response.status(404).json({
			status:"not done"
		})
	}

}
//problem
// 5fad8f085503d91a5f6bd39c
//user
//5fb6353bb0354e4ea8176a4c
import React,{useState,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import axios from 'axios';
export default function CodeEditor(props) {
	const [code, setCode] = useState("print('hello')");
	const [lang,setLang]=useState("python");
	const [output, setOutput] = useState("")
	const [stdin,setStdin] = useState("")
	const [submitExecution,setSubmitExec]=useState(false);
	const [check, setCheck] = useState([])
	const getDefaultCode=()=>{
		switch(lang){
			case 'C':
				return decodeURIComponent("%23include%3Cstdio.h%3E%20%20int%20main()%20%7B%20%20%20%7D");
		}
	}
	const executeCode= (check,input)=>{
		if(check) setSubmitExec(true);
		else setSubmitExec(false);
		console.log(code);
		const options = {
			    method: 'POST',
		  url: 'https://judge0.p.rapidapi.com/submissions',
		  headers: {
		    'content-type': 'application/json',
		    'x-rapidapi-key': '7aefffd8afmshc08e342bbb6e0dbp1c25cejsn1d605c0d141c',
		    'x-rapidapi-host': 'judge0.p.rapidapi.com'
		  },
		  data: {
		    language_id: 71,
		    source_code: code,
		    stdin: check?input:stdin
		  }
		};

		console.log("asdasd");
axios.request(options).then(async function (response) {
			console.log(response.data);
			const options = {
			  method: 'GET',
			  url: 'https://judge0.p.rapidapi.com/submissions/'+response.data.token,
			  headers: {
			    'x-rapidapi-key': '7aefffd8afmshc08e342bbb6e0dbp1c25cejsn1d605c0d141c',
			    'x-rapidapi-host': 'judge0.p.rapidapi.com'
			  }
			};

			return axios.request(options)
		}).then(function (response) {
				console.log(response.data);
				setOutput(response.data.stdout);
			}).catch(function (error) {
			console.log(error);
		});
	}

  // attemptType: request.body.attemptType,
  //       attemptString: request.body.attemptString,
  //       testCasesPassed: request.body.testCasesPassed,
  //       testCasesUserOutputs: request.body.testCasesUserOutputs,
  //       problem: request.body.problemId,
  //       user: request.body.userId,
  const submitCodeUtil=async (x,y)=>{
  	executeCode(x,y)
  }
//   let arr=[];
// for(let i=0;i<tc.length;i++)
//   arr.push(axios({method:'post',data:{code:'',stdin:tc[i]}}));
// const result=await Promise.all(arr);
// arr=[]
// for(let i=0;i<result.length;i++)
//   arr.push(axios({method:'get',data:{codeToken:result[i].token}}));


	const submitCode=async ()=>{
		console.log("submit");
		console.log(props.data.testCases.length)
		let arr=[];
		for(let i=0;i<props.data.testCases.length;i++)
		{		const options = {
				    method: 'POST',
				  url: 'https://judge0.p.rapidapi.com/submissions',
				  headers: {
				    'content-type': 'application/json',
				    'x-rapidapi-key': '7aefffd8afmshc08e342bbb6e0dbp1c25cejsn1d605c0d141c',
				    'x-rapidapi-host': 'judge0.p.rapidapi.com'
				  },
				  data: {
				    language_id: 71,
				    source_code: code,
				    stdin: props.data.testCases[i]
				  }
				};

			arr.push(axios.request(options));
		}
		const result=await Promise.all(arr);
		arr=[];
		for(let i of result){
			const options = {
			  method: 'GET',
			  url: 'https://judge0.p.rapidapi.com/submissions/'+i.data.token,
			  headers: {
			    'x-rapidapi-key': '7aefffd8afmshc08e342bbb6e0dbp1c25cejsn1d605c0d141c',
			    'x-rapidapi-host': 'judge0.p.rapidapi.com'
			  }
			};
			arr.push(axios.request(options));
		}
		const result1=await Promise.all(arr);
		arr=[];
		let arr1=[];
		for(let i=0;i<result1.length;i++){
			console.log(result1[i].data.stdout);
			console.log(props.data.correctOutput[i]);
			arr.push(result1[i].data.stdout==decodeURIComponent(props.data.correctOutput[i]))
			arr1.push(result1[i].data.stdout);
		}
		const options = {
				    method: 'POST',
				  url: '/attempts',
				  headers:{
    'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*"
    				  },
				  data: {
					attemptType: "coding",
			        attemptString: "acceptedTESTING",
			        testCasesPassed: arr,
			        testCasesUserOutputs: arr1,
			        problem: props.data.id,
			        user: localStorage.getItem('userId'),
				  }
				};
		await axios.request(options)
		.then((r)=>console.log(r));
    	console.log(options);
		console.log(props);
		console.log(arr1);
	}
	const getOutput=()=>{
		if(output!=='') return output;
		else  return 'loading...';
	}
	return (
		<div>
				<CodeMirror
					  value={code}
					  options={{
					    theme: 'monokai',
					    keyMap: 'sublime',
					    mode: lang,
					    smartIndent:true,
					    lineNumbers:20
					  }}
					/>
					<div className="output" >
						<div style={{color:'white',width:"100%",backgroundColor:"black",height:"30vh"}} className="code-output">
							<p>
								{submitExecution?"submitting....":getOutput()}
							</p>
						</div>
					</div>

					<div className="stdin">
						<textarea onChange={(e)=>setStdin(e.target.value)}></textarea>
					</div>
					<div className="row">
						<button onClick={()=>executeCode(false,"asd")}>Execute</button>
						<button onClick={()=>submitCode()}>Submit</button>
						
					</div>
					
		</div>
	)
}
  //     
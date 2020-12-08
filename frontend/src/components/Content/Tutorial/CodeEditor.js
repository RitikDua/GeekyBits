import React,{useState,useEffect} from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {cod} from './defaultCode'
import { Switch } from '@material-ui/core';
export default function CodeEditor(props) {
	const [code, setCode] = useState("");
	const [lang,setLang]=useState("C");
	const [output, setOutput] = useState("")
	const [stdin,setStdin] = useState("")
	const [submitExecution,setSubmitExec]=useState(false);
	const [check, setCheck] = useState([])
	const [val, setval] = useState(props.attempt?props.attemptData.attemptString:cod["cpp"]);
	const [codelang, setcodelang] = useState("c_cpp");
	const [testcases, settestcases] = useState("");
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	  });
	  const [swt, setswt] = useState(false);
	
	  const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
		setswt(!swt);
	  };
	const getDefaultCode=()=>{
		switch(lang){
			case 'C':
				return decodeURIComponent("%23include%3Cstdio.h%3E%20%20int%20main()%20%7B%20%20%20%7D");
		}
	}
// 	#include<stdio.h>
// int main(){
// int t;
// scanf("%d",&t);
// printf("hello %d",t);
// }
	
	const executeCode=async ()=>{
	 console.log(parseInt(stdin));
	 const options = {
		  method: 'POST',
		  url: '/compile',
		  data: {
		    lang: "C",
		    code: val,
		    input: (stdin)
		  }
		};
		await axios.request(options)
			.then((res)=>{
				console.log(res.data);
				if(res.data.err){
					setOutput(res.data.error);
				}else
				setOutput(res.data.output);
				})
			.catch((err)=>console.error(err));
	}

// const problemId=request.body.problemId;
	// const userId=request.body.userId;
	// const problemType=request.body.problemType;
	// const code=request.body.code;
	// const lang=request.body.lang;
	
	const submitCode=async ()=>{
	 	console.log(props);
	 	const options = {
			  method: 'POST',
			  url: '/attempts',
			  data: {
			  	attemptType:"CodingProblem",
			    attemptLanguage: "C",
			    attemptString: val,
			    attemptTitle:props.data.title,
			    userId:localStorage.getItem("userId"),
			    problemId:props.data.id,subItemId:props.data.subItemId
			  }
			};
			await axios.request(options)
				.then((res)=>{
					console.log(res.data.data.attempt.testCasesPassed);
					settestcases(res.data.data.attempt.testCasesPassed);
					if(res.data.data.attempt.err){
						setOutput(res.data.data.attempt.error);
					}else
					setOutput(res.data.output);
				})
				.catch((err)=>console.error(err));
		
	}
	const getOutput=()=>{
		return output
	}
	const editorDidMount = (e) => {
        console.log("EDITOR MOUNTED")
	}
	const changedata=(code,e)=>{
		// setCode(code);
		setval(code);
	}
	const onLangSelectHandler = (e) => {
		console.log(e.target.value);
		const lang = e.target.value
		if(lang==="java"){
			setcodelang("java");
		}
		else if(lang==="c" || lang==="cpp"){
			setcodelang("c_cpp")
		}
		else if(lang==="python"){
			setcodelang("python");
		}
        // this.setState({
        //     lang,
        //     code: code[lang]
		// })
		setval(cod[lang]);
		console.log(cod[lang]);
    }
	const options = {
		selectOnLineNumbers: true,
		renderIndentGuides: true,
		colorDecorators: true,
		cursorBlinking: "blink",
		autoClosingQuotes: "always",
		find: {
			autoFindInSelection: "always"
		},
		snippetSuggestions: "inline"
	  };
	return (
		<div>
				{/* <textarea
					   onChange={(e) => {
					  	setCode(e.target.value);
					  }}

					/> */}
					<div  style={{display:"flex",justifyContent:"space-between"}} >
					<div><select id="lang" onChange={(e) => onLangSelectHandler(e)}>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select></div>
						<Switch
							checked={state.checkedA}
							onChange={handleChange}
							name="checkedA"
							inputProps={{ 'aria-label': 'checkbox' }}
							color="primary"
						/>	
					</div>
					<div style={{overflow:"hidden"}}>
						<div><span style={{fontSize:"20px"}}>Code your code here</span></div>
					<AceEditor
						width="100%"
						height="25vh"
						mode={codelang}
						theme={swt===false?"monokai":"xcode"}
						value={val}
						onChange={(code,e)=>changedata(code,e)}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
							</div>
					<div className="output" >
						<div style={{color:'white',width:"100%",backgroundColor:"black",height:"10vh"}} className="code-output">
							<p>
								{submitExecution?"submitting....":getOutput()}
							</p>
						</div>
					</div><br/>

					<div className="stdin">
						<span style={{fontSize:"20px"}}>Provide Input:</span><br/>
						<textarea style={{width:"100%",resize:"none",height:"10vh"}} onChange={(e)=>setStdin(e.target.value)}></textarea>
					</div>
					<div className="row">
					<Button onClick={()=>executeCode()} style={{color:"#0275d8",borderColor:"#0275d8"}} variant="outlined" color="primary">Execute</Button>
						{/* <button>Execute</button> */}&nbsp;&nbsp;
					<Button onClick={()=>submitCode()} style={{color:"green",borderColor:"green"}} variant="outlined">Submit</Button>
					 {/* <button onClick={()=>submitCode()}>Submit</button> */}
					</div><br/>
					{testcases.length!==0 && testcases.map((t,idx)=>(
						<div key={idx} style={{display:"flex",justifyContent:"space-between"}}>
								<div>
								<span style={{fontSize:"20px"}}>TESTCASES: </span>
								</div>
								<div>
									<span style={{fontSize:"20px"}}>{t?"Correct":"Wrong"}</span>
								</div>
								{t===true && <div>
									<span style={{fontSize:"20px"}}><CheckIcon style={{color:"green"}}/></span>
								</div>}
								{t!==true && testcases.length!=0 && <div>
									<span style={{fontSize:"20px"}}><CloseIcon style={{color:"red"}}/></span>
								</div>}
						</div>
					))}
					
		</div>
	)
}
  //     
import React,{useState,useEffect} from 'react'
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {cod} from './defaultCode'
export default function CodeEditor(props) {
	const [code, setCode] = useState("");
	const [lang,setLang]=useState("C");
	const [output, setOutput] = useState("")
	const [stdin,setStdin] = useState("")
	const [submitExecution,setSubmitExec]=useState(false);
	const [check, setCheck] = useState([])
	const [val, setval] = useState(cod["cpp"]);
	const [codelang, setcodelang] = useState("c_cpp");
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
			    problemId:props.data.id
			  }
			};
			await axios.request(options)
				.then((res)=>{
					console.log(res.data);
					if(res.data.data.attempt.err){
						setOutput(res.data.data.attempt.error);
					}else
					setOutput(res.data.output);
				})
				.catch((err)=>console.error(err));
		
	}
	const getOutput=()=>{
		if(output!=='') return output;
		else  return 'loading...';
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
					<div  style={{paddingBottom:"5px"}} >
					<select id="lang" onChange={(e) => onLangSelectHandler(e)}>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select></div>
					<div style={{overflow:"hidden"}}>
						<div><span style={{fontSize:"20px"}}>Code your code here</span></div>
					<AceEditor
						width="100%"
						height="35vh"
						mode={codelang}
						theme="monokai"
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
						<textarea style={{width:"100%",resize:"none",height:"15vh"}} onChange={(e)=>setStdin(e.target.value)}></textarea>
					</div>
					<div className="row">
					<Button onClick={()=>executeCode()} style={{color:"#0275d8",borderColor:"#0275d8"}} variant="outlined" color="primary">Execute</Button>
						{/* <button>Execute</button> */}&nbsp;&nbsp;
					<Button onClick={()=>submitCode()} style={{color:"green",borderColor:"green"}} variant="outlined">Submit</Button>
					 {/* <button onClick={()=>submitCode()}>Submit</button> */}
						
					</div>
					
		</div>
	)
}
  //     
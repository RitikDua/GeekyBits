import React,{useState,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';
import {cod} from './defaultCode'
export default function CodeEditor(props) {
	const [code, setCode] = useState("");
	const [lang,setLang]=useState("C");
	const [output, setOutput] = useState("")
	const [stdin,setStdin] = useState("")
	const [submitExecution,setSubmitExec]=useState(false);
	const [check, setCheck] = useState([])
	const [val, setval] = useState(cod["cpp"]);
	const [codelang, setcodelang] = useState(cod.cpp);
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
		    code: code,
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
			  url: '/submit',
			  data: {
			    lang: "C",
			    attemptString: code,
			    userId:localStorage.getItem("userId"),
			    attemptType:"CodingProblem",
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
		setCode(code);
		setval(code);
	}
	const onLangSelectHandler = (e) => {
		console.log(e.target.value);
        const lang = e.target.value
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
					<div style={{overflow:'hidden'}}>
						<div><span style={{fontSize:"20px"}}>Code your code here</span></div>
					<MonacoEditor
                                width="100%"
                                height="35vh"
                                language="c"
                                theme="vs-dark"
                                value={val}
                                options={options}
                                onChange={(code,e)=>changedata(code,e)}
								editorDidMount={(e)=>editorDidMount(e)}
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
						<button onClick={()=>executeCode()}>Execute</button>
						<button onClick={()=>submitCode()}>Submit</button>
						
					</div>
					
		</div>
	)
}
  //     
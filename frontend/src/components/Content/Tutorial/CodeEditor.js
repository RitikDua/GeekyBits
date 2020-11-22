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

	}


	const submitCode=async ()=>{

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
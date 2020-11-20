import React,{useState,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import axios from 'axios';
export default function CodeEditor() {
	const [code, setCode] = useState("print('hello')");
	const [lang,setLang]=useState("python");
	const [output, setOutput] = useState("")
	const getDefaultCode=()=>{
		switch(lang){
			case 'C':
				return decodeURIComponent("%23include%3Cstdio.h%3E%20%20int%20main()%20%7B%20%20%20%7D");
		}
	}
	const executeCode=()=>{
		let program={
			script:"",
			language:lang,
			versionIndex:"0",
			clientId:"b2cdd1521babf5034428e0a7897c10aa",
			clientSecret:"d8f516bb1303a6f1f23caef6fca17e525408178ac87428eaf450b48f102d668c"
		};

		axios.post('https://api.jdoodle.com/v1/execute',{
			
				program
			
		}).then((res)=>console.log(res))
		.catch((err)=>console.log(err));
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
						<div style={{width:"100%",backgroundColor:"black",height:"30vh"}} className="code-output">
							<p>
								{output||"loading..."}
							</p>
						</div>
					</div>
					<div className="row">
						<button onClick={executeCode()}>Execute</button>
					</div>
					
		</div>
	)
}
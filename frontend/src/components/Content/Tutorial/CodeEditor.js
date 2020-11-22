import React,{useState,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import axios from 'axios';
export default function CodeEditor(props) {
	const [code, setCode] = useState("");
	const [lang,setLang]=useState("C");
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
	// const problemId=request.body.problemId;
	// const userId=request.body.userId;
	// const problemType=request.body.problemType;
	// const code=request.body.code;
	// const lang=request.body.lang;
	
	const executeCode=async (check,input)=>{
		// const code = request.body.code
	 //    const input = request.body.input
	 //    const lang = request.body.lang
	 console.log(code);
	 const options = {
		  method: 'POST',
		  url: '/compile',
		  data: {
		    lang: "C",
		    code: code,
		    input: input
		  }
		};
		await axios.request(options)
			.then((res)=>{
				setOutput(res.data.output);
			})
			.catch((err)=>console.error(err));
	}


	const submitCode=async ()=>{

	}
	const getOutput=()=>{
		if(output!=='') return output;
		else  return 'loading...';
	}
	return (
		<div>
				<textarea
					   onChange={(e) => {
					  	setCode(e.target.value);
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
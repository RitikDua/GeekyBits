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
	const [stdin,setStdin] = useState("")
	const getDefaultCode=()=>{
		switch(lang){
			case 'C':
				return decodeURIComponent("%23include%3Cstdio.h%3E%20%20int%20main()%20%7B%20%20%20%7D");
		}
	}
	const executeCode=async ()=>{
		let program={
			script:code,
			language:lang,
			versionIndex:"0",
			clientId:"b2cdd1521babf5034428e0a7897c10aa",
			clientSecret:"d8f516bb1303a6f1f23caef6fca17e525408178ac87428eaf450b48f102d668c"
		};

	// 	await axios.post('https://api.jdoodle.com/v1/execute',{
	// 			headers: {
	//   'Access-Control-Allow-Origin': '*',
	// },data:JSONprogram
			
	// 	}).then((res)=>console.log(res))
	// 	.catch((err)=>console.log(err));
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
    source_code: 'print("helo")',
    stdin: 'world'
  }
};

console.log("asdasd");
await axios.request(options).then(async function (response) {
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
								{getOutput()}
							</p>
						</div>
					</div>

					<div className="stdin">
						<textarea onChange={(e)=>setStdin(e.target.value)}></textarea>
					</div>
					<div className="row">
						<button onClick={()=>executeCode()}>Execute</button>
					</div>
					
		</div>
	)
}
import React,{useState,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

export default function CodeEditor() {
	const [code, setCode] = useState("")

	return (
		<div>
				<CodeMirror
					  value={code}
					  options={{
					    theme: 'monokai',
					    keyMap: 'sublime',
					    mode: 'text/x-csrc',
					    smartIndent:true,
					    lineNumbers:20
					  }}
					/>
				
		</div>
	)
}
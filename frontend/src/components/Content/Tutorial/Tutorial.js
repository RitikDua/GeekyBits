import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {render} from 'react-dom';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

export default class Tutorial extends React.Component {
	constructor(props){
		super(props);
		this.state={
				"content":"","title":"","codes":[]
			
		}
	}	
	componentDidMount(){
		axios.get(
		`http://localhost:4000/tutorials/0`
		)
		.then( async(res)=>{
			this.setState(
				{
				"content":decodeURIComponent(res.data.content).replace(/\n/gmi,"<br />")
				,"title":res.data.tutorialTitle,
				"codes":res.data.codes
				}
			);}
		)
		.then(()=>console.log("as"))
		.catch((err)=>console.error(err));

	}

	fun=(code)=>{
			return (  
				<CodeMirror
					  value={code}
					  options={{
					    theme: 'monokai',
					    keyMap: 'sublime',
					    mode: 'jsx',readOnly:"true"
					  }}
					/>
				);
		}

	componentDidUpdate(){
		if(!this.state) return "loading...";
			for(let i=0;this.state.codes&&i<this.state.codes.length;i++)
			{	
				let code=decodeURIComponent(this.state.codes[i]);
				render(this.fun(code),document.getElementById("code["+i+"]"));
			}
		
	}	

	hulala=(data)=>{
			if(!data) return "loading....";
			console.log(data.codes);
			for(let i=0;data.codes&&i<data.codes.length;i++)
			{	
				data.content=data.content.replace("#$codes["+i+"]#$",`<div id='code[${i}]'></div>`);
				console.log(data.content);
			}
			return data.content;
		}
	render() {
		return (
		<div>
		<h1>{this.state.title}</h1>
			
			<div dangerouslySetInnerHTML={{__html: this.hulala(this.state)}} />
		
		</div>
	)
	}
}


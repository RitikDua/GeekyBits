import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {render} from 'react-dom';
import "ace-builds/src-noconflict/mode-c_cpp";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import './tut.css'
import { Chip } from '@material-ui/core';
export default class Tutorial extends React.Component {
	constructor(props){
		super(props);
		this.state={
				"content":"","title":"","codes":[]
			
		}
	}	
	async componentDidMount(){
		await axios.get(
		`/courseSubItems/${this.props.queryId}`
		)
		.then( async(res)=>{
			console.log(res);
			this.setState(
				{
				"content":decodeURIComponent(res.data.data.courseSubItem.subItem.content).replace(/\n/gmi,"<br />")
				,"title":res.data.data.courseSubItem.subItem.tutorialTitle,
				"codes":res.data.data.courseSubItem.subItem.codes
				}
			);}
		)
		.catch((err)=>console.error(err));

	}
	async componentWillReceiveProps(){
		await axios.get(
		`/courseSubItems/${this.props.queryId}`
		)
		.then( async(res)=>{
			console.log(res);
			this.setState(
				{
				"content":decodeURIComponent(res.data.data.courseSubItem.subItem.content).replace(/\n/gmi,"<br />")
				,"title":res.data.data.courseSubItem.subItem.tutorialTitle,
				"codes":res.data.data.courseSubItem.subItem.codes
				}
			);}
		)
		.catch((err)=>console.error(err));

	}
	fun=(code)=>{
			return (  
					<AceEditor
						width="100%"
						height="30vh"
						fontSize="15px"
						mode="c_cpp"
						theme="monokai"
						value={code}
						readOnly="true"
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
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
				data.content=data.content.replace("#$codes["+i+"]#$",`<div style="padding-top:2%;padding-bottom:1%" id='code[${i}]'></div>`);
				// console.log(data.content);
			}
			return data.content;
		}
	render() {
		return (
		<div>
		{/* <Navacc/> */}
		<div>
		<span className="title">{this.state.title}</span><br/>
		<div style={{paddingBottom:"1%",paddingTop:"1%"}}><Chip icon={<MenuBookIcon/>} label="Tutorial"/></div>
			<div className="page" dangerouslySetInnerHTML={{__html: this.hulala(this.state)}} />
		</div>
		</div>
	)
	}
}


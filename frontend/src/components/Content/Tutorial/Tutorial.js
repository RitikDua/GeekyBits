import React,{useState,useEffect} from 'react'
import {GetData} from '../../../Services/contentService';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
export default function Tutorial(props) {
	const [data, setData] = useState({});
	const queryId=props.queryId||0;
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const parser= new DOMParser();
	useEffect(() => {
		axios.get(
		`http://localhost:4000/tutorials/${queryId}`
		)
		.then( (res)=>{
			setData(
				{
				"content":decodeURIComponent(res.data.content).replace(/\n/gmi,"<br />")
				,"title":res.data.tutorialTitle
				}
			);}
		)
		.then(()=>console.log(data))
		.catch((err)=>console.error(err));
		
	}, [props])


	return (
		<div>
		<h1>{data.title}</h1>
			{
				console.log(data.content)
			}
		<div dangerouslySetInnerHTML={{__html: data.content}} />
		</div>
	)
}
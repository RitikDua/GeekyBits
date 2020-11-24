import React,{useEffect,useState} from 'react'
import Axios from 'axios';
export default function Attempts(props) {
	
	useEffect(() => {
		const queryId=props.queryId?props.queryId:" ";
		return async() => {
			await Axios.get(`/attempts/${queryId}`)
			.then((res)=>{
				console.log(res);
			}) 
			.catch((err)=>console.log(err));
		};
	}, [props])
	return (
		<div>
				<h1>Attempts</h1>
		</div>
	)
}
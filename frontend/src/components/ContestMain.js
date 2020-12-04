import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function ContestMain() {
	const [contestUrl, setcontestUrl] = useState(localStorage.getItem("contest-url"));
	useEffect(() => {
		async function fun(){
			await Axios.get(contestUrl)
			.then((res)=>{
				console.log(res);
			}).catch((err)=>console.log(err));
		}
		fun();
	}, [contestUrl])
	return (
		<div>
			
		</div>
	)
}

export default ContestMain

import React,{useState,useEffect}from 'react';
import {io} from 'socket.io-client';
import axios from 'axios';
// import './App.css';
function ContestMain() {
  const [socket,setSocket]= useState(io('http://localhost:4000'));
  const [user,setUser]=useState(localStorage.getItem("userId"));
  const [contest,setContest]=useState(null);
  const url=localStorage.getItem("contest-url").split('/');
  const [roomId,setRoomId]=useState(url[url.length-1]);
  const [code,setCode]=useState('');
  const joinRoom=async ()=>{
    socket.emit('participant_connected',{id:socket.id,roomId,userId:user});
  }
  const userExecuted=async ()=>{    
	console.log(contest,code);
	const {data}=await axios({method:'POST',url:`http://localhost:4000/attempts`,data:{ attemptType:'CodingProblem', attemptString:code, attemptLanguage:'C',attemptTitle:decodeURIComponent(contest.problem.problemTitle),subItemId:contest.problem._id},withCredentials:true})
	console.log(data);
    await  axios({method:'POST',url:`http://localhost:4000${localStorage.getItem('contest-url')}`,data:{ attemptId:data.data.attempt._id},withCredentials:true});
    socket.emit('code_executed',{roomId,userId:user,message:{
      attemptResult:data.data.attempt.attemptResult,
      testCasesPassed:data.data.attempt.testCasesPassed
	}});
	const attemptResult=data.data.attempt.attemptResult;
	if(attemptResult==='correct'){
		declareWinner(roomId,user,{winningMessage:' won the match'}); 
	}
  };
  const fetchContest=async ()=>{
	const {data}=await axios({method:'GET',url:`http://localhost:4000${localStorage.getItem("contest-url")}`,withCredentials:true});
	console.log(data);
	const contest=data.data.contest;
	const startAt=contest.startedAt;
	const waitingTime=(Date.parse(startAt)-Date.parse(new Date()))/60000;
	const waitingTimeinMin=Math.floor(waitingTime);
	console.log(waitingTimeinMin,Math.floor((waitingTime-waitingTimeinMin)*60));
	if(waitingTime>0){
		setTimeout(()=>console.log('Started'),waitingTime);
		// const time=setTimeout(declareWinner,30*60000);
	}
    setContest(data.data.contest);
  }
  const declareWinner=async (roomId,userId,message)=>{
	const {data}=await axios({method:'POST',url:`http://localhost:4000${localStorage.getItem('contest-url')}`,withCredentials:true});
	console.log(data);
    socket.emit('winner_declared',{roomId,userId:user,message:{
      winningMessage:' won the match'
	}});
	// clearTimeout(time);
  }
  useEffect(()=>{
    fetchContest();
    socket.on('connect',()=>{      
      joinRoom();
    });
    socket.on('joined_contest_room',data=>{
      console.log(data);
    });
    socket.on('error',error=>{
      console.log(error);
    });
    socket.on('code_executed_server',result=>{
      console.log(result);
    });
    socket.on('winner_declared_server',finalmessage=>{
      console.log(finalmessage);
    });
  },[]);
  return (
    <div className="App">
      <h1 className="title">1 vs 1 challenge</h1>
      <textarea rows='10' cols='30' onChange={e=>setCode(e.target.value)} placeholder='Enter code'></textarea>
      <div className="output"></div>
      <button className="execute" onClick={()=>userExecuted()}>Execute Code</button>
      {/* <button className="winner" onClick={()=>declareWinner()}>Declare Winner</button> */}
    </div>
  );
}
export default ContestMain;

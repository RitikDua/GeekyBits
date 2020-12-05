import React,{useState,useEffect}from 'react';
import {io} from 'socket.io-client';
import axios from 'axios';
import ContestProblem from './ContestProblem';
import Countdown from "react-countdown";
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import CodeEditor from './Content/Tutorial/CodeEditor';
function ContestMain(props) {
  const [socket,setSocket]= useState(io('http://localhost:4000'));
  const [user,setUser]=useState(localStorage.getItem("userId"));
  const [contest,setContest]=useState(null);
  const url=localStorage.getItem("contest-url").split('/');
  const [roomId,setRoomId]=useState(url[url.length-1]);
  const [code,setCode]=useState('');
  const [timer, settimer] = useState("");
  const [dat, setdat] = useState("");
  const [Data, setData] = useState("");
  const joinRoom=async ()=>{
    socket.emit('participant_connected',{id:socket.id,roomId,userId:user});
  }
  const Completionist = () => <span>You are good to go!</span>;
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
  console.log(data.data.contest.problem.problemStatement);
  setData(
    	{
    	"content":decodeURIComponent(data.data.contest.problem.problemStatement).replace(/\n/gmi,"<br />")
    	,"title":decodeURIComponent(data.data.contest.problem.problemTitle),
    	"testCases":data.data.contest.problem.testCases,
    	"correctOutput":data.data.contest.problem.correctOutput
    	,"id":data.data.contest.problem._id,subItemId:data.data.contest.problem._id}
          );

  setdat(data);
	console.log(data);
	const contest=data.data.contest;
	const startAt=contest.startedAt;
	const waitingTime=(Date.parse(startAt)-Date.parse(new Date()))/60000;
	const waitingTimeinMin=Math.floor(waitingTime);
  settimer(waitingTimeinMin,Math.floor((waitingTime-waitingTimeinMin)*60));
  console.log(timer);
  // settimer(Date.parse(startAt)+100000);
	// if(waitingTime>0){
	// 	setTimeout(()=>console.log('Started'),waitingTime);
	// 	// const time=setTimeout(declareWinner,30*60000);
	// }
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
  if(!dat) return <LinearProgress />;
  return (
    <div className="App">
      {/* <h1 className="title">1 vs 1 challenge</h1>
      <textarea rows='10' cols='30' onChange={e=>setCode(e.target.value)} placeholder='Enter code'></textarea>
      <div className="output"></div>
      <button className="execute" onClick={()=>userExecuted()}>Execute Code</button>
      <button className="winner" onClick={()=>declareWinner()}>Declare Winner</button> */}
      <Grid container>
        <Grid item xs={12}>

        <Grid container spacing={2}>
        <Grid item xs={6} sm={5}>
          <Paper style={{"height":"85vh"}} >
          	<h1>{Data.title}</h1>
          	<p>{Data.content}</p>
  			<p><b>Input:</b></p>
          		<div className="jumbotron">
          		
          			{
          				Data&&Data.testCases&&Data.testCases.map((value,index)=>{
          					return (
          							<p key={index}>
          							{decodeURIComponent(value)}<br />
          							</p>
          						)
          				})
          			}
          		</div>
          		<p><b>Output:</b></p>
          		<div className="jumbotron" style={{backgroundColor:"#eee",padding:"1%"}}>
          		
          			{
          				Data&&Data.correctOutput&&Data.correctOutput.map((value,index)=>{
          					return (
          							<p key={index}>
          							{decodeURIComponent(value)}<br />
          							</p>
          						)
          				})
          			}
          		</div>
          </Paper>
        </Grid>
        <Grid item xs={7} sm={7}>
          <Paper style={{"height":"85vh"}}>

          	<CodeEditor data={Data} attempt={props.attempt} attemptData={props.attemptData} />
          </Paper>
        </Grid>
        </Grid>

        </Grid>
        <Grid item xs={6}>
          
        </Grid>
      </Grid>
    </div>
  );
}
export default ContestMain;

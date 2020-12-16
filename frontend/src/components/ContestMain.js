import React,{useState,useEffect}from 'react';
import {io} from 'socket.io-client';
import axios from 'axios';
import Countdown from "react-countdown";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, Paper } from '@material-ui/core';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import Button from '@material-ui/core/Button';
import {cod} from './Content/Tutorial/defaultCode'
import { Switch } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {getUserId} from '../utils/utils';
import { Link } from 'react-router-dom';
function ContestMain(props) {
  const [socket,setSocket]= useState(io('http://localhost:3000'));
  const [user,setUser]=useState(getUserId());
  const [contest,setContest]=useState(null);
  const url=localStorage.getItem("contest-url").split('/');
  const [roomId,setRoomId]=useState(url[url.length-1]);
  const [timer, settimer] = useState("");
  const [dat, setdat] = useState("");
  const [Data, setData] = useState("");
  const [testcases, settestcases] = useState("")
  const [timeLeft,settimeLeft]=useState('');
  const [winner, setwinner] = useState([]);
  const [open, setopen] = useState(false);









  const [code, setCode] = useState("");
	const [output, setOutput] = useState("")
	const [stdin,setStdin] = useState("")
	const [submitExecution,setSubmitExec]=useState(false);
	const [val, setval] = useState(props.attempt?props.attemptData.attemptString:cod["cpp"]);
	const [codelang, setcodelang] = useState("c_cpp");
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	  });
	  const [swt, setswt] = useState(false);
	
	  const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
		setswt(!swt);
	  };
	const executeCode=async ()=>{
	 console.log(parseInt(stdin));
	 const options = {
		  method: 'POST',
		  url: '/compile',
		  data: {
		    lang: lang,
		    code: val,
		    input: (stdin)
		  }
		};
		await axios.request(options)
			.then((res)=>{
				console.log(res.data);
				if(res.data.err){
					setOutput(res.data.error);
				}else
				setOutput(res.data.output);
				})
			.catch((err)=>console.error(err));
	}
	const getOutput=()=>{
		return output
	}
	const changedata=(code,e)=>{
		setCode(code);
		setval(code);
	}
	const onLangSelectHandler = (e) => {
		console.log(e.target.value);
		const lang = e.target.value
		setLang(lang);
		if(lang==="java"){
			setcodelang("java");
		}
		else if(lang==="c" || lang==="cpp"){
			setcodelang("c_cpp")
		}
		else if(lang==="python"){
			setcodelang("python");
		}
		setval(cod[lang]);
		console.log(cod[lang]);
    }


  const joinRoom=async ()=>{
    socket.emit('participant_connected',{id:socket.id,roomId,userId:user});
  }
  const userExecuted=async ()=>{    
	console.log(contest,code);
	const {data}=await axios({method:'POST',url:`/attempts`,data:{ attemptType:'CodingProblem', attemptString:code, attemptLanguage:lang,attemptTitle:decodeURIComponent(contest.problem.problemTitle),subItemId:contest.problem._id},withCredentials:true})
	console.log(data);
    await  axios({method:'POST',url:`${localStorage.getItem('contest-url')}`,data:{ attemptId:data.data.attempt._id},withCredentials:true});
    socket.emit('code_executed',{roomId,userId:user,message:{
      attemptResult:data.data.attempt.attemptResult,
      testCasesPassed:data.data.attempt.testCasesPassed
	}});
	const attemptResult=data.data.attempt.attemptResult;
	if(attemptResult==='correct'){
    settestcases(data.data.attempt.testCasesPassed);
	declareWinner(roomId,user,{winningMessage:' won the match'}); 
  }
  else{
    settestcases(data.data.attempt.testCasesPassed);
  }
  };
  const fetchContest=async ()=>{
try{
  const {data}=await axios({method:'GET',url:`${localStorage.getItem("contest-url")}`,withCredentials:true});
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
  settimeLeft(new Date(data.data.contest.startedAt));
	console.log(data);
	const contest=data.data.contest;
	const startAt=contest.startedAt;
	console.log(new Date(startAt));
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
catch(err) {
	console.log(err.response.data);
}
  }
  const declareWinner=async (roomId,userId,message)=>{
	try{
	const {data}=await axios({method:'POST',url:`${localStorage.getItem('contest-url')}`,withCredentials:true});
	console.log(data);
    socket.emit('winner_declared',{roomId,userId:data.data.contest.winner,message});
	}
	catch(err) {
		console.log(err);
	}
	// clearTimeout(time);
  }
  const renderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
	  // Render a completed state
	  declareWinner(roomId,user,{winningMessage:' won the match.'});
	  return <span>Contest Finished</span>;
	} else {
	  return <span>{hours}:{minutes}:{seconds}</span>;
	}
  };
  useEffect(()=>{    
    socket.on('connect',()=>{      
      joinRoom();
    });
    socket.on('joined_contest_room',data=>{
	  console.log(data);
	  fetchContest();
    });
    socket.on('error',error=>{
	  console.log(error);
    });
    socket.on('code_executed_server',result=>{
      console.log(result);
    });
    socket.on('winner_declared_server',finalmessage=>{
	  console.log(finalmessage);
	  setwinner(finalmessage);
	  setopen(true);
	  socket.disconnect();
	// if(open===false){
	// 	 window.location.href="/";
	// }
	//   alert(`${finalmessage.name} wont the contest!!`);
    });
  },[]);

  if(!dat) return <LinearProgress />;
  if(timeLeft.length!==0 && timeLeft.getTime()-Date.now()>0){
	 return(
		 <div style={{backgroundImage:`url(${process.env.PUBLIC_URL + `/image/1v1.jpg`})`,height:"100vh",backgroundSize:"cover",overflow:"hidden"}}>
		<div  style={{textAlign:"center",background:"rgba(0, 0, 0, 0.2)",overflow: "hidden",height:"100vh"}}>
			<div>
				<h1 style={{fontSize:"40px"}}>1 vs 1 Contest</h1>
			</div>
			<div>
				<span style={{fontSize:"20px"}}>Contest Will Start at {timeLeft.length!==0 && timeLeft.getTime()-Date.now()>0 && timeLeft.toTimeString()}</span>
			</div><br/>
			<div>
				<span style={{fontSize:"15px"}}>Time for Completing the Contest is 30 minutes</span><br/>
			</div>
			<br/>
			<div>
			<Button variant="contained" onClick={()=>window.location.reload()} color="secondary">Start Contest</Button>
			</div>
		</div>
		</div>
	 );
  }
  return (
    <div className="App" style={{height:"100vh"}}>
	  {console.log(timeLeft)}
		{timeLeft?<div style={{backgroundColor:"#111",color:"white",width:"100px",padding:"1% 2%"}}><Countdown date={Date.now()+timeLeft.getTime()+30*60000-Date.now()} renderer={renderer}/></div>:null}
        <Grid container spacing={2}>
        <Grid item xs={6} sm={5} style={{paddingTop:"2%"}}>
          <Paper style={{"height":"94vh"}} >
            <div style={{paddingLeft:"2%",paddingTop:"2%"}}>
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
          		</div></div>
          </Paper>
        </Grid>
        <Grid item xs={7} sm={7} style={{paddingTop:"2%"}}>
          <Paper style={{"height":"94vh"}}>
          <div style={{padding:"2%"}}>
          <div  style={{display:"flex",justifyContent:"space-between"}} >
					<div><select id="lang" onChange={(e) => onLangSelectHandler(e)}>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select></div>
						<Switch
							checked={state.checkedA}
							onChange={handleChange}
							name="checkedA"
							inputProps={{ 'aria-label': 'checkbox' }}
							color="primary"
						/>	
					</div>
					<div style={{overflow:"hidden"}}>
						<div><span style={{fontSize:"20px"}}>Code your code here</span></div>
					<AceEditor
						width="100%"
						height="30vh"
						mode={codelang}
						theme={swt===false?"monokai":"xcode"}
						value={val}
						onChange={(code,e)=>changedata(code,e)}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>
							</div>
					<div className="output" >
						<div style={{color:'white',width:"100%",backgroundColor:"black",height:"10vh"}} className="code-output">
							<p>
								{submitExecution?"submitting....":getOutput()}
							</p>
						</div>
					</div><br/>

					<div className="stdin">
						<span style={{fontSize:"20px"}}>Provide Input:</span><br/>
						<textarea style={{width:"100%",resize:"none",height:"15vh"}} onChange={(e)=>setStdin(e.target.value)}></textarea>
					</div>
					<div className="row">
					<Button onClick={()=>executeCode()} style={{color:"#0275d8",borderColor:"#0275d8"}} variant="outlined" color="primary">Execute</Button>
						&nbsp;&nbsp;
					<Button onClick={()=>userExecuted()} style={{color:"green",borderColor:"green"}} variant="outlined">Submit</Button>
					 
						
					</div><br/>
					{testcases.length!==0 && testcases.map((t,idx)=>(
						<div key={idx} style={{display:"flex",justifyContent:"space-between"}}>
								<div>
								<span style={{fontSize:"20px"}}>TESTCASES: </span>
								</div>
								<div>
									<span style={{fontSize:"20px"}}>{t?"Correct":"Wrong"}</span>
								</div>
								{t===true && <div>
									<span style={{fontSize:"20px"}}><CheckIcon style={{color:"green"}}/></span>
								</div>}
								{t!==true && testcases.length!=0 && <div>
									<span style={{fontSize:"20px"}}><CloseIcon style={{color:"red"}}/></span>
								</div>}
						</div>
					))}
					</div>



          </Paper>
        </Grid>
        </Grid>
		<Dialog
                      style={{textAlign:"center"}}
                          open={open}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description">
                          <DialogTitle id="alert-dialog-title">
							  <Link to="#" style={{textDecoration:"none",color:"black"}} onClick={()=>window.location.href="/"}><div style={{float:"right",paddingRight:"2%"}} onClick={()=>setopen(false)}><span>x</span></div></Link>
							  <span>{winner.name} Won the contest</span></DialogTitle>
                          <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          <img src={process.env.PUBLIC_URL + `/image/winner.jpg`} alt="error" style={{width:"200px",height:"150px"}}/>
                          </DialogContentText>
                          </DialogContent>
                      </Dialog>
    </div>
  );
}
export default ContestMain;
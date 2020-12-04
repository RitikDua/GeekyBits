import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CodeEditor from './CodeEditor';
import './tut.css';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    
  },
}));
// 5fafeec106ccb1909bbc2bb0
export default function FullWidthGrid(props) {
  const [data, setData] = useState({})
  const classes = useStyles();
   useEffect(() => {
    console.log(props);
  	const fun= async () => {
  		await axios.get(
		`/courseSubItems/${props.queryId}`
		)
		.then((res)=>{
			console.log(res.data.data);
			setData(
				{
				"content":decodeURIComponent(res.data.data.courseSubItem.subItem.problemStatement).replace(/\n/gmi,"<br />")
				,"title":decodeURIComponent(res.data.data.courseSubItem.subItem.problemTitle),
				"testCases":res.data.data.courseSubItem.subItem.testCases,
				"correctOutput":res.data.data.courseSubItem.subItem.correctOutput
				,"id":res.data.data.courseSubItem._id,subItemId:res.data.data.courseSubItem.subItem._id}
			);}
		)
		.catch((err)=>console.error(err));

  	};
    fun();
  }, [props])
 if(!data.content) return <LinearProgress />;
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        
        <Grid item xs={6} sm={5}>
          <Paper style={{"height":"85vh"}} className={classes.paper}>
          	<h1>{data.title}</h1>
          	<p>{data.content}</p>
  			<p><b>Input:</b></p>
          		<div className="jumbotron">
          		
          			{
          				data&&data.testCases&&data.testCases.map((value,index)=>{
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
          				data&&data.correctOutput&&data.correctOutput.map((value,index)=>{
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
          <Paper style={{"height":"85vh"}} className={classes.paper}>

          	<CodeEditor data={data} attempt={props.attempt} attemptData={props.attemptData} />
          </Paper>
        </Grid>
        
        </Grid>
    </div>
  );
}

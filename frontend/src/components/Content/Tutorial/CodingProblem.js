import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CodeEditor from './CodeEditor';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    
  },
}));

export default function FullWidthGrid(props) {
  const [data, setData] = useState({})
  const classes = useStyles();
   useEffect(() => {
  	return async () => {
  		await axios.get(
		`http://localhost:4000/codingProblems/0`
		)
		.then((res)=>{
			console.log(res);
			setData(
				{
				"content":decodeURIComponent(res.data.problemStatement).replace(/\n/gmi,"<br />")
				,"title":decodeURIComponent(res.data.problemTitle),
				"testCases":res.data.testCases,
				"correctOutput":res.data.correctOutput
				}
			);}
		)
		.catch((err)=>console.error(err));

  	};
  }, [])
 if(!data.content) return "loading...";
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={6} sm={5}>
          <Paper style={{"height":"80vh"}} className={classes.paper}>
          	<h1>{data.title}</h1>
          	<p>{data.content}</p>
  			<p><b>Input:</b></p>
          		<div className="jumbotron">
          		
          			{
          				data.testCases.map((value,index)=>{
          					return (
          							<p key={index}>
          							{decodeURIComponent(value)}<br />
          							</p>
          						)
          				})
          			}
          		</div>
          		<p><b>Output:</b></p>
          		<div className="jumbotron">
          		
          			{
          				data.correctOutput.map((value,index)=>{
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
        <Grid item xs={6} sm={6}>
          <Paper style={{"height":"80vh"}} className={classes.paper}>

          	<CodeEditor />
          </Paper>
        </Grid>
        
        </Grid>
    </div>
  );
}

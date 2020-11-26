import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import CodingProblem from '../Content/Tutorial/CodingProblem';
import MCQ from '../Content/Tutorial/MCQ';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: "100%",
  },
  fullList: {
    width: '100vw',
  },
});
const anchor="right"
export default function Attempts(props) {
	const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [runningIndex,setRunningIndex]=useState(0);
  const [data, setData] = useState([])
	
  const toggleDrawer = (anchor, open,index) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(index)
    {	const fun=async ()=>setRunningIndex(index);
    	fun().then(()=>setDrawer(open))
    	.catch(err=>console.error(err));
    }
    else setDrawer(open);
  };
  const showAttempt=(index)=>{
	console.log(runningIndex);  
	if(!data||data.length<=runningIndex||!data[runningIndex]) return "loading...";
  	
  else 	if(data[runningIndex].attemptType==="CodingProblem"){
  		console.log("asd");
  		return <CodingProblem attempt="true"  queryId={data[runningIndex].problem} attemptData={data[runningIndex]}/>
  	}
  	else
  	{  return <MCQ attempt="true"  queryId={data[runningIndex].problem} attemptData={data[runningIndex]}/>
    }
  	console.log(data[index]);
  }
  	useEffect(() => {
		//use for both problem specific and all problems
		const queryId=props.queryId?props.queryId:" ";
		const fetchData=async() => {
			await Axios.get(`/attempts/${queryId}`)
			.then((res)=>{
				console.log(res.data.data.attempts);
				setData(res.data.data.attempts)
			}) 
			.catch((err)=>console.log(err));
		};
		fetchData();

	}, [props])
	return (
		<div>
		<ul>
			{
				data&&data.map((value,index)=>{
					
					return (<li key={index} onClick={toggleDrawer(anchor, true,index)}>{value.attemptTitle}</li>)
				})
			}
		</ul>	
		
          <Drawer anchor={anchor} open={drawer} onClose={toggleDrawer(anchor, false)}>
            {showAttempt(runningIndex)}
          </Drawer>
  
		</div>
	)
}



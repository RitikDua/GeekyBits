import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Button, List, ListItem } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Axios from 'axios';
import CodingProblem from './Content/Tutorial/CodingProblem';
import Tutorial from './Content/Tutorial/Tutorial';
import MCQ from './Content/Tutorial/MCQ';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  HashRouter as
  Link,
} from 'react-router-dom';

const drawerWidth = 370;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function ResponsiveDrawer(props) {
  const myName=props.name?props.name:"username";
  const { window } = props;
  const [progress, setProgress] = useState(0)
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = useState({})
  const [course, setcourse] = useState(["asd"]);
  const [subItems, setSubItems] = useState({})
  const [item, setitem] = useState([])
  const [currIndex, setCurrIndex] = useState("")
  const [currComponent, setCurrComponent] = useState({}) 
  const [open, setOpen] = React.useState(false);
  const courseId=props.courseId||"5fb01e55e8d9acbadcd66bff";
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
     async function fun(){
      await Axios.get(`/courses/${courseId}`, {withCredentials: true})
      .then((res)=>{
        console.log("asdasdasdasdasda")
        console.log(res.data.data);
        setData(res.data.data.course);
        setProgress(res.data.data.courseProgressPercent);
         })
      .catch((err)=>console.log(err));
     }
     fun();
  }, []);
  const showSubItemsData=(index)=>{
    if(!subItems[index]) return <CircularProgress />;
    else
    {
      let temp="";
      for(let i of subItems[index]){
        temp+="*"+i.subItemType+"\n";
      }

      return temp;
    }
  }
  const showAccordianData=async (index,value)=>{
  await Axios.get(`/courseItems/${value._id}`, {withCredentials: true})
        .then((res)=>{
          console.log("setSubItems");
          let indexStr=""+index;
          console.log(res.data.data.courseItem.subItems);  
          
          let items=Object.assign({},subItems);
          items[index]=res.data.data.courseItem.subItems;
          setSubItems(items);
          console.log(subItems);
          })
        .catch((err)=>console.log(err));
  
  }
  const changeMainComponent=(parentIndex,index)=>{
    const fun=async()=>setCurrComponent(subItems[parentIndex][index]);
    fun().then(()=>setCurrIndex(parentIndex+" "+index));
    console.log(currComponent);
  }
  const check=(index)=>{
    if(subItems[index]) return true;
    return 
  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />

    <div style={{paddingLeft:"4%",paddingRight:"4%"}}><span style={{fontSize:"22px"}}>{data?data.courseTitle:<CircularProgress />} </span></div><br/>
       <LinearProgress value={progress||0} variant="determinate"/>
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary style={{backgroundColor:"grey",color:"white"}} aria-controls="panel1d-content" id="panel1d-header">
          <Typography >Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List component="nav" aria-label="secondary mailbox folders">
          {

         data&& data.courseItems&&data.courseItems.map((parentValue,parentIndex)=>{
          
          return (<Accordion key={parentIndex}
              style={{width:"340px",overflow:"hidden"}}
            >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={(e)=>showAccordianData(parentIndex,parentValue)}
            style={{overflowX:"hidden"}}
          >
            <Typography style={{fontWeight:"bold",fontSize:"15px"}} className={classes.heading}>{parentValue.itemTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <List>
           {
             subItems[parentIndex]?(subItems[parentIndex].map((val,index)=>{
              // console.log(subItems);
              return (
                <ListItem style={{width:"1200px"}} key={index} button  onClick={(e)=>changeMainComponent(parentIndex,index)}>
                  <div style={{fontSize:"17px",padding:"1%"}}>{val.subItemType=='Tutorial'?<MenuBookIcon style={{paddingRight:"1%",fontSize:"18px"}}/>:<span></span>}{val.subItemType=='MCQ'?<PlaylistAddCheckIcon style={{paddingRight:"1%",fontSize:"18px"}}/>:<span></span>}{val.subItemType=='CodingProblem'?<AssignmentIcon style={{paddingRight:"1%",fontSize:"18px"}}/>:<span></span>} {decodeURIComponent(val.subItemTitle)}</div>
                </ListItem>)              
             })):<CircularProgress />
           }
           </List>
            
          </AccordionDetails>
        </Accordion>)
          })
        }
        
        </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
  const getDefaultComponent=()=>{
    if(!currComponent){
      console.log("asd");
      return <LinearProgress />
    }

    console.log(currComponent);
    switch(currComponent.subItemType){
      case "Tutorial":
        return <Tutorial courseId={courseId} queryId={currComponent._id} />
      case "MCQ":
        return <MCQ queryId={currComponent._id} />
      case "CodingProblem":
        return <CodingProblem queryId={currComponent._id} />
    }
  }
  const container = window !== undefined ? () => window().document.body : undefined;
  const paginationUtil=()=>{
    let indexes=currIndex.split(" ").map((val,index)=>  parseInt(val));
    console.log(indexes);
    indexes[1]+=1;
    let fun=async ()=> setCurrIndex(indexes[0]+" "+indexes[1]);
    fun().then(()=>changeMainComponent(indexes[0],indexes[1]))
  
  }
  const pagination=()=>{
    if(!data) return <LinearProgress />
    if(!currComponent||currIndex.length===0) return  <Tutorial courseId={courseId} queryId="5fafeec106ccb1909bbc2bac" />;
    
    let indexes=currIndex.split(" ").map((val,index)=>  parseInt(val));
      
    if(subItems[indexes[0]].length-1===indexes[1])
      return '';
    return (
        <div style={{float:"right"}}><Button style={{backgroundColor:"rgb(7, 54, 64)",color:"white"}} onClick={()=>paginationUtil()} >next</Button></div>
      )
    }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" flexGrow={1}>
          <Link to={'/'} style={{ textDecoration: 'none','color':'white' }}>
          <Typography variant="h5" noWrap>
            GeekyBits
          </Typography>
          </Link>
          </Box>
          <PermIdentityIcon />
          <Typography variant="p" noWrap>
            &nbsp; {myName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {drawer}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {getDefaultComponent()}
         {pagination()}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

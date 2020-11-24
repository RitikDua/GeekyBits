import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Axios from 'axios';
import CodingProblem from './Content/Tutorial/CodingProblem';
import Tutorial from './Content/Tutorial/Tutorial';
import MCQ from './Content/Tutorial/MCQ';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function ResponsiveDrawer(props) {
  const myName=props.name?props.name:"username";
  const { window } = props;
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
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
     async function fun(){
      await Axios.get(`/courses/5fb01e55e8d9acbadcd66bff`, {withCredentials: true})
      .then((res)=>{
        console.log(res.data.data.course.courseItems);
        setData(res.data.data.course);
         })
      .catch((err)=>console.log(err));
     }
     fun();
  }, []);
  const showSubItemsData=(index)=>{
    if(!subItems[index]) return "loading...";
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
          // setSubItems({...subItems,...{"value":{indexStr:{res.data.courseItem.subItems}}})
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
    <div style={{paddingLeft:"4%",paddingRight:"4%"}}><span style={{fontSize:"22px"}}>{data?data.courseTitle:"loading...."} </span></div><br/>
        <Accordion  square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary style={{backgroundColor:"grey",color:"white"}} aria-controls="panel1d-content" id="panel1d-header">
          <Typography >Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List component="nav" aria-label="secondary mailbox folders">
          {

         data&& data.courseItems&&data.courseItems.map((parentValue,parentIndex)=>{
          
          return (<Accordion key={parentIndex}

            >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={(e)=>showAccordianData(parentIndex,parentValue)}
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
                  <span>{val.subItemType=='Tutorial'?<MenuBookIcon/>:<span></span>}{val.subItemType=='MCQ'?<PlaylistAddCheckIcon/>:<span></span>}{val.subItemType=='CodingProblem'?<AssignmentIcon/>:<span></span>} {decodeURIComponent(val.subItemTitle)}</span>
                </ListItem>)              
             })):"loading..."
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
    if(!currComponent) return "loading...";
    switch(currComponent.subItemType){
      case "Tutorial":
        return <Tutorial queryId={currComponent._id} />
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
    if(!currComponent||currIndex.length===0) return "loading...";
     let indexes=currIndex.split(" ").map((val,index)=>  parseInt(val));
      
    if(subItems[indexes[0]].length-1===indexes[1])
      return '';
    return (
        <button onClick={()=>paginationUtil()} >next</button>
      )
    }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" flexGrow={1}>
          <Typography variant="h5" noWrap>
            GeekyBits
          </Typography>
          </Box>
          <PermIdentityIcon />
          <Typography variant="p" noWrap>
            &nbsp; {myName}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{paddingTop:"5%"}}>
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

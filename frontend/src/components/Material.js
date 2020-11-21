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
import { Box, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Axios from 'axios';

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
        console.log(res.data.data.course);
        setData(res.data.data.course);
         })
      .catch((err)=>console.log(err));
     }
     fun();
  }, []);
  const drawer = (
    <div>
      <div className={classes.toolbar} />
  <div style={{paddingLeft:"4%",paddingRight:"4%"}}><span style={{fontSize:"18px"}}>{data?data.courseTitle:"loading...."}</span></div><br/>
        <Accordion  square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary style={{backgroundColor:"grey",color:"white"}} aria-controls="panel1d-content" id="panel1d-header">
          <Typography >Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List component="nav" style={{width:"100%"}}>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );

const showAccordianDataUtil=async (val)=>{
    
}
const showAccordianData=async (index,value)=>{
// await Axios.get(`/courseItems/${value._id}`, {withCredentials: true})
//       .then((res)=>{
//         console.log("setSubItems");
//         let indexStr=""+index;
//           setSubItems({...subItems,...{"value":{indexStr:{res.data.courseItem.subItems}}})
//         console.log(subItems)
//         })
//       .catch((err)=>console.log(err));
}
  const container = window !== undefined ? () => window().document.body : undefined;

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
     
        {
         data&& data.courseItems&&data.courseItems.map((value,index)=>{
          
          return (<Accordion key={index}

            >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={(e)=>showAccordianData(index,value)}
          >
            <Typography className={classes.heading}>{value.itemTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            loading...
            </Typography>
          </AccordionDetails>
        </Accordion>)
          })
        }
        </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

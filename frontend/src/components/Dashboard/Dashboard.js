import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.css';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import MenuIcon from '@material-ui/icons/Menu';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import DashboardRoutes from '../../routes/DashboardRoutes';
import Axios from 'axios';

const drawerWidth = 230;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    overflowY:'hidden',
  },
  appBar: {
     zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
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
}));

// const DashboardRoutes=[]
function ResponsiveDrawer(props) {
  const myName=props.name?props.name:"username";
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // localStorage.getItem("contest-url")
  function reloadPage(){ 
    // window.location.reload(); 
    document.location.reload()
   {/*<Redirect to={'/'} exact="true" />*/}
  }
 const handleLogout=async ()=>{
  
    await Axios.get(`/users/logout`,{withCredentials:true})
    .then((res)=>{
      console.log(res);
      localStorage.removeItem("login");

     // window.location.href="http://localhost:3000/login"
    })
    .then(reloadPage)
    .catch((err)=>{
      console.log(err);
    })
  
}
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      
      <List>
        
          <Link to={`/dashboard`} style={{ textDecoration: 'none','color':'black' }}><ListItem button key="Dashboard" style={{height:"112px",width:"100%",textAlign:"center"}}><DashboardIcon style={{fontSize:"40px"}}/> <ListItemText primary="Dashboard" /></ListItem></Link>
          <Link to={`/profile`} style={{ textDecoration: 'none','color':'black' }}><ListItem button key="Profile" style={{height:"112px",width:"100%",textAlign:"center"}}><BarChartIcon style={{fontSize:"40px"}}/> <ListItemText primary="Profile" /></ListItem></Link>
         <Link to={`/attempts`} style={{ textDecoration: 'none','color':'black' }}> <ListItem button key="Attempts" style={{height:"112px",width:"100%",textAlign:"center"}}><AssignmentIcon style={{fontSize:"40px"}}/> <ListItemText primary="Attempts" /></ListItem></Link>
         <Link to={`/contest`} style={{ textDecoration: 'none','color':'black' }}> <ListItem button key="Contest" style={{height:"112px",width:"100%",textAlign:"center"}}><SupervisorAccountIcon style={{fontSize:"40px"}}/> <ListItemText primary="Contest" /></ListItem></Link>
         <Link to={`/register`} style={{ textDecoration: 'none','color':'black' }}> <ListItem button key="Register" style={{height:"112px",width:"100%",textAlign:"center"}}><SupervisorAccountIcon style={{fontSize:"40px"}}/> <ListItemText primary="Register" /></ListItem></Link>
         <Link to={`/`} onClick={()=>handleLogout()} style={{ textDecoration: 'none','color':'black' }}> <ListItem button key="Logout" style={{height:"112px",width:"100%",textAlign:"center"}}><LockOpenIcon style={{fontSize:"40px"}}/> <ListItemText primary="Logout" /></ListItem></Link>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
  <Router>
    <div className={classes.root} style={{overflowX:"hidden"}}>
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
      <main className={classes.content}>
           <Route exact path="/" render={()=><Redirect to="/dashboard" />} />
           <Switch>
            {DashboardRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                render={()=><route.main />}
              />
            ))}
          </Switch>
      </main>
    </div>
    </Router>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

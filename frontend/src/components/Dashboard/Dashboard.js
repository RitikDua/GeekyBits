import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './dashboard.css';
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
import { Chip, Grid } from '@material-ui/core';
const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
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

function ResponsiveDrawer(props) {
  const myName=props.name?props.name:"username";
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

// const icons=[<DashboardIcon />,<BarChartIcon />,<AssignmentIcon />,<SupervisorAccountIcon />];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      
      <List>
        <div>
      <ListItem button key="Dashboard" style={{height:"160px",width:"100%",textAlign:"center"}}><DashboardIcon style={{fontSize:"40px"}}/> <ListItemText primary="Dashboard" /></ListItem>
      <ListItem button key="Rank" style={{height:"160px",width:"100%",textAlign:"center"}}><BarChartIcon style={{fontSize:"40px"}}/> <ListItemText primary="Rank" /></ListItem>
      <ListItem button key="Attempts" style={{height:"160px",width:"100%",textAlign:"center"}}><AssignmentIcon style={{fontSize:"40px"}}/> <ListItemText primary="Attempts" /></ListItem>
      <ListItem button key="Contest" style={{height:"160px",width:"100%",textAlign:"center"}}><SupervisorAccountIcon style={{fontSize:"40px"}}/> <ListItemText primary="Contest" /></ListItem>
      </div>
        {/* {['Dashboard', 'Rank', 'Attempts', 'Contest'].map((text, index) => (
          <div style={{textAlign:"center"}}>
          <ListItem button key={text} style={{height:"160px",width:"100%",textAlign:"center"}}>
            <span style={{width:"40px",fontSize:"30px"}}>{ icons[index] }</span>
           
            <ListItemText primary={text} />
          
          </ListItem></div>
        ))} */}
      </List>
      <Divider />
    </div>
  );

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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container style={{paddingTop:"2%"}}>
          <Grid item xs={4} className="course" style={{paddingBottom:"2%"}}>
            <Grid container style={{height:"300px",width:"400px",borderRadius:"15px",boxShadow: "0px 0px 25px 0px #111"}}>
              <Grid item xs={12} style={{height:"160px",backgroundSize:"cover",backgroundImage:`url(${process.env.PUBLIC_URL + `/image/c-lang.png`})`,borderTopLeftRadius:"15px",borderTopRightRadius:"15px"}}>
              </Grid>
              <Grid item xs={12} style={{height:"120px",paddingTop:"2%",paddingLeft:"2%"}}>
                <div >
                  <span style={{fontWeight:"bold",fontSize:"17px"}}>C Programming course - Master the C Language</span><br/>
                    <Rating name="read-only" value={4} readOnly /><br/><Chip label="COURSE" size="small" className={classes.chip}/>
                </div>
              </Grid>
            </Grid>                    
          </Grid>
          <Grid item xs={4} style={{paddingBottom:"2%"}}>
            <Grid container style={{height:"300px",width:"400px",borderRadius:"15px",boxShadow: "0px 0px 25px 0px #111"}}>
              <Grid item xs={12} style={{height:"160px",backgroundSize:"cover",backgroundImage:`url(${process.env.PUBLIC_URL + `/image/c-lang.png`})`,borderTopLeftRadius:"15px",borderTopRightRadius:"15px"}}>
              </Grid>
              <Grid item xs={12} style={{height:"120px",paddingTop:"2%",paddingLeft:"2%"}}>
                <div >
                  <span style={{fontWeight:"bold",fontSize:"17px"}}>C Programming course - Master the C Language</span><br/>
                    <Rating name="read-only" value={4} readOnly /><br/><Chip label="COURSE" size="small" className={classes.chip}/>
                </div>
              </Grid>
            </Grid>                    
          </Grid>
          <Grid item xs={4} style={{paddingBottom:"2%"}}>
            <Grid container style={{height:"300px",width:"400px",borderRadius:"15px",boxShadow: "0px 0px 25px 0px #111"}}>
              <Grid item xs={12} style={{height:"160px",backgroundSize:"cover",backgroundImage:`url(${process.env.PUBLIC_URL + `/image/c-lang.png`})`,borderTopLeftRadius:"15px",borderTopRightRadius:"15px"}}>
              </Grid>
              <Grid item xs={12} style={{height:"120px",paddingTop:"2%",paddingLeft:"2%"}}>
                <div >
                  <span style={{fontWeight:"bold",fontSize:"17px"}}>C Programming course - Master the C Language</span><br/>
                    <Rating name="read-only" value={4} readOnly /><br/><Chip label="COURSE" size="small" className={classes.chip}/>
                </div>
              </Grid>
            </Grid>                    
          </Grid>          
        </Grid>
      </main>
    </div>
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

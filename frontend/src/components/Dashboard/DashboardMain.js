import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.css';

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

import {useStyles} from './Dashboard';
const DashboardMain=(props)=>{
    const classes = useStyles();

  return (
      
      <React.Fragment>
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
      </React.Fragment>
    )
} 

export default DashboardMain;
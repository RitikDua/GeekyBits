import React from 'react'
import ProfileBio from './ProfileBio';
// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Pie from './Stats/Pie';

import Line from './Stats/Line';
import Bar from './Stats/Bar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{paddingTop:"50px"}}>
      <Grid container direction="row" spacing="3" >         
        <Grid item xs={7} sm={7}>
        	<Paper><div style={{paddingLeft:"5%",paddingTop:"2.5%",paddingBottom:"6%"}}><ProfileBio /></div>
        </Paper></Grid>
        <Grid   item xs={5} sm={5}>
        	<Paper><Pie /></Paper>
        </Grid>
       </Grid>
       <Grid container direction="row" spacing="3" >  
        <Grid  item xs={7} sm={7}>
        	<Paper><Line /></Paper>
        </Grid>
        <Grid  item xs={5} sm={5}>
        	<Paper><Bar /></Paper>
        </Grid>
        </Grid>
    </div>
  );
}

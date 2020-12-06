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
      <Grid container direction="row" >         
        <Grid style={{border:"1px solid black"}} item xs={7} sm={7}>
        	<div style={{paddingLeft:"5%",paddingTop:"2%"}}><ProfileBio /></div>
        </Grid>
        <Grid style={{border:"0px solid black"}}  item xs={5} sm={5}>
        	<Pie />
        </Grid>
       </Grid>
       <Grid container direction="row" >  
        <Grid style={{border:"1px solid black"}} item xs={8} sm={8}>
        	<Line />
        </Grid>
        <Grid style={{border:"1px solid black"}} item xs={4} sm={4}>
        	<Bar />
        </Grid>
        </Grid>
    </div>
  );
}

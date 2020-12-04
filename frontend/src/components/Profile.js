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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{paddingTop:"100px"}}>
      <Grid container spacing={3}>
      
        <Grid item xs={8} sm={8}>
        	<ProfileBio />
        </Grid>
        <Grid item xs={4} sm={4}>
        	<Pie />
        </Grid>
        <Grid item xs={8} sm={8}>
        	<Line />
        </Grid>
        <Grid item xs={4} sm={4}>
        	<Bar />
        </Grid>

      </Grid>
    </div>
  );
}

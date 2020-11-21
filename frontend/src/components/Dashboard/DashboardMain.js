import React from 'react';
import './dashboard.css';
import Rating from '@material-ui/lab/Rating';
import { Chip, Grid } from '@material-ui/core';
import {useStyles} from './Dashboard';
const DashboardMain=(props)=>{
    const classes = useStyles();

  return (
      
      <React.Fragment>
      <div className={classes.toolbar} />
        <Grid container style={{paddingTop:"2%"}} spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4} className="course" style={{paddingBottom:"2%"}}>
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
          <Grid item xs={12} sm={12} md={12} lg={4} style={{paddingBottom:"2%"}}>
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
          <Grid item xs={12} sm={12} md={4} lg={4} style={{paddingBottom:"2%"}}>
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
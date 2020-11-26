import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Rating from '@material-ui/lab/Rating';
import { Chip, Grid } from '@material-ui/core';
import {useStyles} from './Dashboard';
import Axios from 'axios';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
const DashboardMain=(props)=>{
    const classes = useStyles();
    const [course, setcourse] = useState([]);
    useEffect(() => {
      async function fun(){
         const val=(await Axios.get(`/courses/`, {withCredentials: true}));
         setcourse(val.data.data.courses);
         console.log(val);
      }
      fun();
   }, []);
  //  
  return (
      
      <React.Fragment>
      <div className={classes.toolbar}  />
        <Grid container style={{paddingTop:"2%"}} spacing={3}>
          
          {course.map(pos=>(

            <Grid onClick={()=>window.location.href="/course"} key={pos._id} item xs={12} sm={12} md={4} lg={4} className="course" style={{paddingBottom:"2%"}}>
              <Grid container style={{height:"300px",width:"400px",borderRadius:"15px",boxShadow: "0px 0px 25px 0px #111"}}>
                <Grid item xs={12} style={{height:"160px",backgroundSize:"cover",backgroundImage:`url(${process.env.PUBLIC_URL + `/image/c-lang.png`})`,borderTopLeftRadius:"15px",borderTopRightRadius:"15px"}}>
                </Grid>
                <Grid item xs={12} style={{height:"120px",paddingTop:"2%",paddingLeft:"2%"}}>
                  <div >
                    <div style={{paddingBottom:"2%"}}><span style={{fontWeight:"bold",fontSize:"17px"}}>{pos.courseTitle}</span></div>
                      <Rating name="read-only" value={4} readOnly /><br/><Chip label="COURSE" size="small" className={classes.chip}/>
                  </div>
                </Grid>
              </Grid>                
          </Grid>))}     
       
        </Grid>
      </React.Fragment>
    )
} 

export default DashboardMain;
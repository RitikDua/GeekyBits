import { Grid} from '@material-ui/core'
import React from 'react'
import '../css/gridblock.css';
function Gridblock() {
    return (
        <div style={{paddingTop:"5%"}}>
            <div style={{paddingLeft:"5%",paddingRight:"5%",backgroundColor:"rgb(250, 250, 250)"}}>
            <Grid container spacing={7}>
                <Grid item xs={12} sm={12} md={3} lg={3} style={{backgroundColor:"rgb(250, 250, 250)"}}>
                    <div className="card" style={{textAlign:"center",padding:"8%",borderRadius:"15px"}}>
                        <img src={`${process.env.PUBLIC_URL + `/image/desktop.png`}`}/><br/><br/>
                        <span className="title" style={{fontSize:"24px",fontWeight:"bolder"}}>1600+ Topics</span><br/>
                        <span className="about" style={{fontWeight:"lighter",letterSpacing:"1px"}}>LEARN ANYTHING</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} style={{backgroundColor:"rgb(250, 250, 250)"}}>
                <div className="card" style={{textAlign:"center",padding:"8%",borderRadius:"15px"}}>
                        <img src={`${process.env.PUBLIC_URL + `/image/student-genius.png`}`}/><br/><br/>
                        <span style={{fontSize:"24px",fontWeight:"bolder"}}>1900+ Students</span><br/>
                        <span style={{fontWeight:"lighter",letterSpacing:"1px"}}>FUTURE GENIUS</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} style={{backgroundColor:"rgb(250, 250, 250)"}}>
                <div className="card" style={{textAlign:"center",padding:"8%",borderRadius:"15px"}}>
                        <img src={`${process.env.PUBLIC_URL + `/image/tests-taken.png`}`}/><br/><br/>
                        <span style={{fontSize:"24px",fontWeight:"bolder"}}>15900+ Test Taken</span><br/>
                        <span style={{fontWeight:"lighter",letterSpacing:"1px"}}>THATS A LOT</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} style={{backgroundColor:"rgb(250, 250, 250)"}}>
                <div className="card" style={{textAlign:"center",padding:"8%",borderRadius:"15px"}}>
                        <img src={`${process.env.PUBLIC_URL + `/image/apple.png`}`}/><br/><br/>
                        <span style={{fontSize:"24px",fontWeight:"bolder"}}>250+ INSTRUCTORS</span><br/>
                        <span style={{fontWeight:"lighter",letterSpacing:"1px"}}>ALL TRAINED PROFESSIONALS</span>
                    </div>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default Gridblock

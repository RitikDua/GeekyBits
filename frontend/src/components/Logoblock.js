import { Grid } from '@material-ui/core'
import React from 'react'
function Logoblock() {
    return (
        <div style={{paddingTop:"7%",paddingLeft:"5%",paddingRight:"5%",paddingBottom:"5%"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h1>The Prodigious Courses for you<br/>
                        <hr style={{height:"3px",backgroundColor:"rgb(47, 240, 180)",border:"none",borderRadius:"2px"}}/>
                        </h1><br/>
                        <div style={{fontWeight:"normal",fontSize:"18px",color:"grey",width:"500px",lineHeight:"1.5"}}>
                            Our quality curriculum is designed with top-tier industry partners, not academics, so you learn the high-impact skills that top companies want.
                        </div><br/><br/>
                        <div style={{lineHeight:"3"}}>
                         <img style={{width:"30px",paddingRight:"4%"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/bulb.png`}`}/><span style={{fontWeight:"lighter",fontSize:"17px",color:"grey"}}>Creative Study Pattern</span><br/>
                         <img style={{width:"30px",paddingRight:"4%"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/rocket.png`}`}/><span style={{fontWeight:"lighter",fontSize:"17px",color:"grey"}}>Quick Crash Courses</span><br/>
                         <img style={{width:"30px",paddingRight:"4%"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/protractor.png`}`}/><span style={{fontWeight:"lighter",fontSize:"17px",color:"grey"}}>Provided with Experimental Examples</span><br/>
                         <img style={{width:"30px",paddingRight:"4%"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/certificate-icon.png`}`}/><span style={{fontWeight:"lighter",fontSize:"17px",color:"grey"}}>Certification Awarded</span><br/>
                         </div>
                </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <div  style={{paddingTop:"24%",paddingLeft:"8%",lineHeight:"5"}}>
                <Grid container spacing={10}>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <img style={{width:"120px"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/aws.png`}`}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <img style={{width:"120px"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/sass.svg`}`}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <img style={{width:"150px"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/mongo.png`}`}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                       <img style={{width:"100px"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/js.png`}`}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <img style={{width:"150px"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/node.png`}`}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <img style={{width:"150px"}} alt="logo" src={`${process.env.PUBLIC_URL + `/image/react.png`}`}/>
                    </Grid>
                </Grid>
            </div>
            </Grid>
            </Grid>
        </div>
    )
}

export default Logoblock

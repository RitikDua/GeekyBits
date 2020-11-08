import { Grid } from '@material-ui/core'
import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import '../css/footer.css'
function Footer() {
    return (
        <div className="foot">
            <Grid style={{paddingBottom:"5%"}} container spacing={7}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <div className="social" style={{paddingLeft:"15%",paddingTop:"7%"}}>
                        <img className="logo" src={`${process.env.PUBLIC_URL + `/image/facebook.png`}`}/>
                        <img className="logo" src={`${process.env.PUBLIC_URL + `/image/linkedin.png`}`}/>
                        <img className="logo" src={`${process.env.PUBLIC_URL + `/image/instagram.png`}`}/>
                        <img className="logo" src={`${process.env.PUBLIC_URL + `/image/youtube.png`}`}/>
                        <img className="logo" src={`${process.env.PUBLIC_URL + `/image/google-plus.png`}`}/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <div className="gridcontact">
                        <span className="contact">Contact us</span><br/><br/>
                        <LocationOnIcon style={{color:"grey",paddingRight:"2%"}}/><span>Address : Box 564, Disneyland USA</span><br/><br/>
                        <PhoneIcon style={{color:"grey",paddingRight:"2%"}}/><span>Phone : +1212121212</span><br/><br/>
                        <EmailIcon style={{color:"grey",paddingRight:"2%"}}/><span>Email : geekybits@gmail.com</span>
                    </div>
                </Grid>
            </Grid>
            <hr style={{width:"1300px",color:"grey"}}/>
            <div className="copy" style={{textAlign:"center",color:"grey",fontSize:"17px",paddingTop:"2%"}}>Copyright © 2020. All Rights Reserved</div>
        </div>
    )
}

export default Footer

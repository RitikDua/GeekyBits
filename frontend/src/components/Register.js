import React, { useState } from 'react'
import { Button, Grid, TextField} from '@material-ui/core';
import Axios from 'axios';
function Register() {
    const [url, seturl] = useState("");
    const [contest, setcontest] = useState("");
    const handleSub=(e)=>{
        e.preventDefault();
        Axios.post(url)
        .then((res)=>{
            console.log(res.data.contestStartUrl);
            setcontest(res.data.contestStartUrl);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleRedirect=()=>{
        localStorage.setItem("contest-url",contest);
        window.location.href="/contestmain";
    }
    return (
        <div style={{paddingTop:"50px"}}>
             <div style={{textAlign:"center",backgroundColor:"white",height:"100vh"}}>
            <div style={{paddingTop:"10%"}}>
           <h1>Have you got Register-URL?</h1><br/><br/>
           <form noValidate autoComplete="off" onSubmit={(e)=>handleSub(e)}>
            <TextField value={url} onChange={(e)=>seturl(e.target.value)} style={{width:"400px",height:"40px"}} id="outlined-basic"  variant="outlined" /><br/><br/><br/>
            <Button style={{width:"400px"}} type="submit" variant="outlined" color="primary">Register</Button>
            </form></div><br/><br/>
            {contest && <div style={{display:"flex",paddingLeft:"20%"}}><div style={{fontSize:"25px"}}><span>Contest-URL: &nbsp;&nbsp;</span></div><div onClick={()=>handleRedirect()} style={{backgroundColor:"#F5F5F5",width:"550px",padding:"1% 2%"}}><span>{contest}</span></div></div>}<br/>
        </div>
        </div>
    )
}

export default Register

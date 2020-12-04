import React, { useState } from 'react'
import { Button, Grid, TextField} from '@material-ui/core';
import Axios from 'axios';
function Register() {
    const [url, seturl] = useState("");
    const handleSub=(e)=>{
        e.preventDefault();
        Axios.post(url)
        .then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div style={{paddingTop:"50px"}}>
             <div style={{textAlign:"center",backgroundColor:"white",height:"100vh"}}>
            <div style={{paddingTop:"10%"}}>
           <h1>Have you got Register-URL?</h1><br/><br/>
           <form noValidate autoComplete="off" onSubmit={(e)=>handleSub(e)}>
            <TextField value={url} onChange={(e)=>seturl(e.target.value)} style={{width:"400px",height:"40px"}} id="outlined-basic"  variant="outlined" /><br/><br/><br/>
            <Button style={{width:"400px"}} type="submit" variant="outlined" color="primary">Register</Button>
            </form></div>
        </div>
        </div>
    )
}

export default Register

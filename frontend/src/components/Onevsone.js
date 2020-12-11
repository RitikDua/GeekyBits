import React, { useEffect, useState } from 'react'
import { Button, Grid} from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios';
function Onevsone() {
    const [register, setregister] = useState("");
    const [contest, setcontest] = useState("");
    const [copy2, setcopy2] = useState(false);
    const [copy, setcopy] = useState(false);
    useEffect(() => {
        
    }, [register,contest]);
    const handlecopy2=()=>{
        setcopy2(true);
        setTimeout(() => {
            setcopy2(false);
          }, 1500);
    }
    const handleRedirect=()=>{
        localStorage.setItem("contest-url",contest);
        window.location.href="/contestmain";
    }
     const handleContest=()=>{
        async function fun(){
            await Axios.post('/contests')
            .then((res)=>{
                setregister(res.data.data.registerUrl);
                setcontest(res.data.data.contestStartUrl);
                console.log(res);
            }).catch((err)=>console.log(err));
        }
        fun();
    }
    return (
        <div style={{paddingTop:"50px"}}>
            <img src={process.env.PUBLIC_URL + `/image/contest.jpg`} style={{width:"1250px",height:"550px"}}/>
            {(copy2) && <div style={{paddingLeft:"30%",width:"650px",zIndex:"100",position:"absolute"}}><Alert severity="success">Copied</Alert></div>}
            <Grid container style={{zIndex:"-1"}}>
                <Grid item xs={5}>
                    <div style={{textAlign:"center",paddingTop:"30px"}}>
                <Button onClick={()=>handleContest()} style={{width:"450px"}} variant="outlined" color="primary">Contest</Button>
                </div>
                </Grid>
                <Grid item xs={7}>
                    {register && contest &&
                    <div>
                        <div style={{display:"flex"}}><div style={{fontSize:"25px"}}><span>Contest-URL: &nbsp;&nbsp;</span></div><div onClick={()=>handleRedirect()} style={{backgroundColor:"#F5F5F5",width:"550px",padding:"1% 2%"}}><span>{contest}</span></div></div><br/>
                        <div style={{display:"flex"}}><div style={{fontSize:"25px"}}><span>Register-URL: &nbsp;</span></div><CopyToClipboard text={register}
          onCopy={() => setcopy(true)}><div onClick={()=>handlecopy2()} style={{backgroundColor:"#F5F5F5",width:"550px",padding:"1% 2%"}}><span>{register}</span></div></CopyToClipboard></div>
                    </div> 
                    }
                    {!register && !contest &&
                    <div style={{textAlign:"center",fontSize:"30px",fontWeight:"bold",paddingTop:"20px"}}>CREATE CONTEST</div>
                    }
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Onevsone

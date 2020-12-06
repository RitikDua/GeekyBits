import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
function Profile(props) {
    const [copy, setcopy] = useState(false);
    const [obj, setobj] = useState([]);
    const [oldpass, setoldpass] = useState("");
    const [newpass, setnewpass] = useState("");
    useEffect(() => {
         function fun(){
            Axios.get(`/profile`)
            .then(res=>{
                
                setobj(res.data.data.user);
            })
            
            .catch(err=>console.log(err));
        
        }
        fun();
    }, [props])
    const handleDelete=(e)=>{
        e.preventDefault();
    }
    const handlePassword=(e)=>{
        e.preventDefault();
        Axios.patch(`/users/changePassword`,{currentPassword:oldpass,newPassword:newpass})
        .then((res)=>{
            console.log("updated");
        }).catch((err)=>console.log(err));
    }
    if(!obj || obj.length===0)return "loading...";
    return (
        <div>
            <div>
                <Grid container direction="row" style={{paddingBottom:"10px"}} >
                    <Grid item xs={12}>
                        <Grid container direction="row" >
                            <Grid item xs={3}>
                                <h2>Name</h2>
                            </Grid>
                            <Grid item xs={8}>
                                <h2>{obj.name}</h2>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" >
                            <Grid item xs={3}>
                                <h2>Email</h2>
                            </Grid>
                            <Grid item xs={8}>
                                <h2>{obj.email}</h2>
                            </Grid>
                        
                        </Grid>
                        <Grid container direction="row">
                                    <Grid item xs={3}>
                                    <span style={{fontSize:"20px",color:"grey"}}><span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>ProfileShortLink:  </span><br/>
                                    </span></Grid>
                                    <Grid item xs={8}>
                                    <span style={{fontSize:"20px",resize:"none"}}>{obj.profileShortLink} </span><CopyToClipboard text={obj.profileShortLink}
                                        onCopy={() => setcopy(true)}><Button style={{height:"20px",width:"20px"}} variant="contained" color="primary">Copy</Button></CopyToClipboard>
                                    </Grid>
                        </Grid>

                        <Grid container direction="row" >
                            <Grid item xs={3}>
                                <h2>Change Password</h2>
                            </Grid>
                            <Grid item xs={8}>
                             <form noValidate autoComplete="off" onSubmit={(e)=>handlePassword(e)}>
                                    <Grid container>
                                        <Grid item xs={5}>
                                        <TextField id="standard-basic" value={oldpass} label="Old Password" onChange={(e)=>setoldpass(e.target.value)}/>
                                        <TextField id="standard-basic" value={newpass} label="New Password" onChange={(e)=>setnewpass(e.target.value)}/>
                                        </Grid>
                                        <Grid xs={1}></Grid>
                                        <Grid item xs={5}>
                                        <div style={{paddingTop:"25%"}}><Button style={{paddingLeft:"5%"}} disabled={!newpass || !oldpass} type="submit" variant="contained" color="primary">Change</Button></div>
                                        </Grid>
                                    </Grid>
                                    
                                    </form>
                           
                            </Grid>
                        
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Profile


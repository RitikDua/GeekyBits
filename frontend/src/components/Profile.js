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
        async function fun(){
            await Axios.get(`/users/profile`)
            .then(res=>{
                console.log(res);
                setobj(res.data.data.user);
                // resolve();
                console.log(obj);
            })
            // .then(()=>console.log(obj))
            .catch(err=>console.log(err));
            // setobj();
            // console.log(obj);
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
        <div style={{paddingTop:"50px"}}>
            <div>
                <Grid container direction="row" >
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <h1>Account</h1>
                        <hr/>
                        <br/>
                        <Grid container>
                            <Grid item xs={5}>
                                <span style={{fontSize:"20px",color:"grey"}}>Member</span>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{lineHeight:"30px"}}>
                                <span style={{fontSize:"20px",color:"grey"}}><span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>Name: </span>{obj.name}</span><br/>
                                <span style={{fontSize:"20px",color:"grey"}}><span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>Email: </span>{obj.email}</span><br/>
                                <span style={{fontSize:"20px",color:"grey"}}><span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>Password: </span>********</span><br/>
                                </div><br/>
                                <hr/>
                                <br/>
                                <Grid container>
                                    <Grid item xs={12}>
                                    <span style={{fontSize:"20px",color:"grey"}}><span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>ProfileShortLink:  </span><span style={{fontSize:"20px",resize:"none"}}>{obj.profileShortLink} </span><CopyToClipboard text={obj.profileShortLink}
          onCopy={() => setcopy(true)}><Button style={{height:"20px",width:"20px"}} variant="contained" color="primary">Copy</Button></CopyToClipboard></span><br/>
                                    </Grid>
                                </Grid>
                            </Grid><br/>
                            <Grid item xs={5} style={{paddingTop:"10%"}}><br/>
                            <span style={{fontSize:"20px",color:"grey"}}>Setting</span>
                            </Grid>
                            <Grid item xs={7}>
                                <br/><br/>
                                <hr/><br/>
                                <span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>Change Password:</span>
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
                                    <br/>
                                    <div style={{lineHeight:"2"}}>
                                    <span style={{fontSize:"20px",color:"black",fontWeight:"bold"}}>Delete Account:</span><br/>
                                    <Link to="#" onClick={()=>handleDelete()} style={{color:"red",textDecoration:"none"}}>Delete Me</Link></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Profile

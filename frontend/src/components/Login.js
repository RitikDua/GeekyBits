import React, { useState } from 'react'
import Icon from '@material-ui/icons/Send';
import { Button, FormControl, Grid, Hidden, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReactCardFlip from 'react-card-flip';
import '../css/login.css'
function Login() {
    const [loguser, setloguser] = useState("");
    const [logpass, setlogpass] = useState("");
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");
    const [values, setValues] = React.useState({
        showPassword: false,
      });
      const [values1, setValues1] = React.useState({
        showPassword1: false,
      });
    function handleSignup(e){
        e.preventDefault();
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    async function handleLogin(e){
        e.preventDefault();
    }
    const [isFlipped, setisFlipped] = useState(false)
    return (
         <div style={{height:"100vh",overflow:"hidden"}}>
                    {/* <header className="banner" style={{backgroundImage:`url(${process.env.PUBLIC_URL + `/image/best.jpg`})`,height:"100vh"}}> */}
                    <Grid container className="gridset" spacing={2}>
                    <Grid item md={4} lg={4}></Grid>
                        <Grid item xs={5}>
                        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                          <div className="logon">
                        <form noValidate autoComplete="off" onSubmit={(e)=>(handleLogin(e))} >
                            <h1 className="log">Log-In <LockOpenIcon style={{fontSize:"25px"}}/></h1><br/>
                            <TextField id="outlined-basic" label="Username*" variant="outlined" value={loguser} name="username" onChange={(e)=>setloguser(e.target.value)} style={{width:"300px"}}/><br/><br/>
                            <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={logpass} name="password" onChange={(e)=>setlogpass(e.target.value)} style={{width:"300px"}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            </FormControl><br/><br/>
                            <div style={{textAlign:"justify",paddingTop:"3%"}}>
                            <Button disabled={!loguser || !logpass} type="submit" variant="contained" color="primary" >LogIn<Icon style={{padding:"2%"}}/>
                            </Button><span style={{color:"red",paddingLeft:"20%"}} onClick={()=>setisFlipped(!isFlipped)}>Not Registered Yet?</span></div>
                            </form>
                            </div>
                            <div className="logon">
                    <form noValidate autoComplete="off" onSubmit={(e)=>handleSignup(e)}>
                        <h1 className="sign" style={{color:"black"}}>Sign-Up <ExitToAppIcon style={{fontSize:"25px",color:"black"}}/></h1><br/>
                    <TextField id="outlined-basic" label="Username*" variant="outlined" value={user} name="username" onChange={(e)=>setuser(e.target.value)} style={{width:"300px"}}/><br/><br/>
                    <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={pass} name="password" onChange={(e)=>setpass(e.target.value)} style={{width:"300px"}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            </FormControl><br/><br/>
                            <div style={{textAlign:"justify",paddingTop:"3%"}}>
                    <Button disabled={!user || !pass} type="submit" variant="contained" color="primary" >SignUp<Icon style={{padding:"2%"}}/></Button>
                    <span style={{color:"red",paddingLeft:"18%"}} onClick={()=>setisFlipped(!isFlipped)}>Already Registered?</span></div>
                    </form></div></ReactCardFlip></Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
                {/* </header> */}               
        </div>
    )
}

export default Login

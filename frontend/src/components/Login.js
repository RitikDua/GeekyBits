import React, { useState } from 'react'
import Icon from '@material-ui/icons/Send';
import { Button, FormControl, Grid, Hidden, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReactCardFlip from 'react-card-flip';
import Dashboard from './Dashboard/Dashboard'
// import CodingProblem from './Content/Tutorial/CodingProblem.js';
import Main from './Main';
import '../css/login.css'
// import CodingProblem from './Content/Tutorial/CodingProblem';
import Attempts from './Attempts/Attempts'
import Axios from 'axios';
import Profile from './Profile';
function Login() {
    const [logname, setlogname] = useState("");
    const [logemail, setlogemail] = useState("");
    const [logpass, setlogpass] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    let storage=localStorage;
    const  getToken=()=>{
        return storage.getItem("login");
    }
    const  saveToken=(token)=>{
        storage.setItem('login',token); 
    }
    const [values, setValues] = React.useState({
        showPassword: false,
      });
      const [values1, setValues1] = React.useState({
        showPassword1: false,
      });
    function isLoggedIn(){
        const token=getToken();
        if(token){
              const payload=JSON.parse(atob(token.split('.')[1]));     
          return ((Date.now()/1000)-payload.iat)<6.048e+8;
        }
        else{
          return false;
        }
    }
    async function handleSignup(e){
        e.preventDefault();
       console.log(pass);
        await Axios.post("/users/signup",{email:email,name:name,password:pass})
         .then((res)=>{
            console.log(res.data.data.token);
            window.localStorage.setItem('login', res.data.data.token)
            setlogpass("");
            setlogname("");
            setlogemail("");
        })
        .catch((res)=>{
            console.log(res);
            setlogpass("");
            setlogname("");
            setlogemail("");
        });

    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      async function handleLogin(e){
        e.preventDefault();
        await Axios.post("/users/login",{email:logemail,password:logpass})
        .then((res)=>{
            console.log(res.data.data);
            window.localStorage.setItem('login', res.data.data.token)
            window.localStorage.setItem('userId', res.data.data.user._id)
            
            setlogpass("");
            setlogname("");
            setlogemail("");
        })
        .catch((res)=>{
            console.log(res);
            setlogpass("");
            setlogname("");
            setlogemail("");
        });
    }
    const [isFlipped, setisFlipped] = useState(false)
    if(isLoggedIn()) return <Dashboard/>
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
                            <TextField id="outlined-basic" label="Name*" variant="outlined" value={logname} name="name" onChange={(e)=>setlogname(e.target.value)} style={{width:"300px"}}/><br/><br/>
                            <TextField id="outlined-basic" label="Email*" variant="outlined" value={logemail} name="email" onChange={(e)=>setlogemail(e.target.value)} style={{width:"300px"}}/><br/><br/>
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
                            <Button disabled={!logemail || !logpass} type="submit" variant="contained" color="primary" >LogIn<Icon style={{padding:"2%"}}/>
                            </Button><span style={{color:"red",paddingLeft:"20%"}} onClick={()=>setisFlipped(!isFlipped)}>Not Registered Yet?</span></div>
                            </form>
                            </div>
                            <div className="logon">
                    <form noValidate autoComplete="off" onSubmit={(e)=>handleSignup(e)}>
                        <h1 className="sign" style={{color:"black"}}>Sign-Up <ExitToAppIcon style={{fontSize:"25px",color:"black"}}/></h1><br/>
                    <TextField id="outlined-basic" label="Name*" variant="outlined" value={name} name="name" onChange={(e)=>setname(e.target.value)} style={{width:"300px"}}/><br/><br/>
                    <TextField id="outlined-basic" label="Email*" variant="outlined" value={email} name="email" onChange={(e)=>setemail(e.target.value)} style={{width:"300px"}}/><br/><br/>
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
                    <Button disabled={!email || !pass} type="submit" variant="contained" color="primary" >SignUp<Icon style={{padding:"2%"}}/></Button>
                    <span style={{color:"red",paddingLeft:"18%"}} onClick={()=>setisFlipped(!isFlipped)}>Already Registered?</span></div>
                    </form></div></ReactCardFlip></Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
                {/* </header> */}               
        </div>
    )
}

export default Login

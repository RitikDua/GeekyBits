import React, { useEffect, useRef, useState } from 'react'
// import '../css/nav.css'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import MoreIcon from '@material-ui/icons/MoreVert';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
          
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
function Nav() {
    const [show, setshow] = useState(false);
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Product</MenuItem>
      <MenuItem onClick={handleMenuClose}>Information</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="courses" color="inherit">
            <WorkOutlineIcon />
        </IconButton>
        <p>Courses</p>
      </MenuItem>
      <MenuItem>
      <Link to={`/login`} style={{ textDecoration: 'none','color':'black' }}>

        <IconButton aria-label="Login" color="inherit">
            
            <LockOpenIcon />
        </IconButton>
        <p>Login</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="about-us"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <InfoIcon />
        </IconButton>
        <p>About Us</p>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    window.addEventListener("scroll",()=>{
      if(window.scrollY>50){
          setshow(true);
      }
      else{
          setshow(false);
      }
  });
  return()=>{
      window.removeEventListener("scroll",()=>{
            setshow(false);
        });
      }
  }, [])
  return (
    <div className={classes.grow} style={{backgroundColor:"rgb(7, 54, 64)"}}>
      <AppBar position="static" style={show==false?{backgroundColor:"transparent",boxShadow:"none",position:"fixed",transition:"0.2s ease-out"}:{backgroundColor:"rgb(7, 54, 64)",position:"fixed",transition:"0.2s ease-in"}}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <span>GeekyBits</span>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="courses" color="inherit">
                <WorkOutlineIcon />
            </IconButton>
                  <Link to={`/login`} style={{ textDecoration: 'none','color':'white' }}>

            <IconButton aria-label="login" color="inherit">
            <LockOpenIcon />
            </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="about-us"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <InfoIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Nav

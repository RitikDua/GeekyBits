import Material from '../components/Material';
import Login from '../components/Login';
import ContestMain from '../components/ContestMain';

import HomePage from '../components/HomePage';
import Dashboard from '../components/Dashboard/Dashboard';

const  getToken=()=>{
        return localStorage.getItem("login");
    }
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
const MainRoutes = [
    {
      path: "/login",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <Login />
    },
    {
      path: "/contestmain",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <ContestMain />
    },
    
    {
      path: "/course",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <Material />
    },
    {
      path:"/",
      exact:true,
      sidebar:()=><div></div>,
      main:()=>{
        return (isLoggedIn()?<Dashboard />:<HomePage />)
      }
    },



  ];

  export default MainRoutes;
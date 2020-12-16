import DashboardMain from '../components/Dashboard/DashboardMain';
import Attempts from '../components/Attempts/Attempts';
import Profile from '../components/Profile';
import Onevsone from '../components/Onevsone';
import Register from '../components/Register';
const DashboardRoutes = [

    {
      path: "/dashboard",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <DashboardMain />
    },

    {
      path: "/profile",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <div><Profile /></div>
    },
    
    {
      path: "/attempts",
      sidebar: () => <div>home</div>,
      main: () => <Attempts />
    },
    
    {
      path: "/contest",
      sidebar: () => <div>home</div>,
      main: () => <div><Onevsone/></div>
    },
    {
      path: "/register",
      sidebar: () => <div>home</div>,
      main: () => <div><Register/></div>
    },
  ];

  export default DashboardRoutes;
import DashboardMain from '../components/Dashboard/DashboardMain';
import Attempts from '../components/Attempts/Attempts';
import Profile from '../components/Profile';
import Stats from '../components/Stats/Stats'
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
      main: () => <div><Stats /></div>
    },
    
    {
      path: "/attempts",
      sidebar: () => <div>home</div>,
      main: () => <Attempts />
    },
    
    {
      path: "/contest",
      sidebar: () => <div>home</div>,
      main: () => <div>Contest</div>
    },
    
  ];

  export default DashboardRoutes;
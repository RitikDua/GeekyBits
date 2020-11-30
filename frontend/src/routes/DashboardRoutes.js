import DashboardMain from '../components/Dashboard/DashboardMain';
import Attempts from '../components/Attempts/Attempts';
import Profile from '../components/Profile';

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
      main: () => <div><Profile/></div>
    },
    
    {
      path: "/attempts",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <Attempts />
    },
    
    {
      path: "/contest",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <div>Contest</div>
    },
    
  ];

  export default DashboardRoutes;
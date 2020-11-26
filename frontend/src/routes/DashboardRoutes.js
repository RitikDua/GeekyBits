import DashboardMain from '../components/Dashboard/DashboardMain';
import Attempts from '../components/Attempts/Attempts';

const DashboardRoutes = [

    {
      path: "/dashboard",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <DashboardMain />
    },

    {
      path: "/rank",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <div><h1>Rank</h1></div>
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
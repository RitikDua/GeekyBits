import DashboardMain from '../components/Dashboard/DashboardMain';

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
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <div>Attempts</div>
    },
    
    {
      path: "/contest",
      exact:true,
      sidebar: () => <div>home</div>,
      main: () => <div>Contest</div>
    },
    
  ];

  export default DashboardRoutes;
import Material from '../components/Material';
import Dashboard from '../components/Dashboard/Dashboard';

const MainRoutes = [

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
      main:()=><Dashboard />
    }

  ];

  export default MainRoutes;
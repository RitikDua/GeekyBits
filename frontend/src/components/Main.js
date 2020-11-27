import React from 'react'
import Banner from './Banner';
import Nav from './Nav';
import Flow from './Flow';
import Gridblock from './Gridblock';
import Logoblock from './Logoblock';
import Footer from "./Footer";
import Dashboard from './Dashboard/Dashboard';
import { Route, Switch,Link } from 'react-router-dom';
import MainRoutes from '../routes/MainRoutes';
function Main() {
    return ( 
        <main>
        <h1>adss</h1>
           <Switch>
            {MainRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
          {/*<Dashboard />*/}
      </main>
   
    )
}
export default Main

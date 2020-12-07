import React from 'react'
import { Route, Switch} from 'react-router-dom';
import MainRoutes from '../routes/MainRoutes';
function Main() {
    return ( 
        <main>
        
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
      </main>
   
    )
}
export default Main

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
export default function HomePage() {
    return ( 
        <main>
          <Nav />
          <Banner />
          <Flow />
          <Gridblock />
          <Logoblock />
          <Footer />
          </main>
          )
}
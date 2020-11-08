import React from 'react'
import Banner from './Banner';
import Nav from './Nav';
import Flow from './Flow';
import Gridblock from './Gridblock';
import Logoblock from './Logoblock';
import Footer from "./Footer";
function Main() {
    return (
        <div>
            <Nav/>
            <Banner/>
            <Flow/>
            <Logoblock/>
            <Gridblock/>
            <Footer/>
        </div>
    )
}
export default Main

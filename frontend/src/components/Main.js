import React from 'react'
import Banner from './Banner';
import Nav from './Nav';
import Flow from './Flow';
import Gridblock from './Gridblock';
import Logoblock from './Logoblock';
function Main() {
    return (
        <div>
            <Nav/>
            <Banner/>
            <Flow/>
            <Logoblock/>
            <Gridblock/>
        </div>
    )
}
export default Main

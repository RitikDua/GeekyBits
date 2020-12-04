import React from 'react'

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

export default function Contest() {
	return (
		<div><br /><br />
			{/*<Link to={`/login`} style={{ textDecoration: 'none','color':'black' }}>*/}
			<button onClick={()=>window.location.href="/contestmain"}>Contest</button>
			{/*</Link>*/}
		</div>
	)
}
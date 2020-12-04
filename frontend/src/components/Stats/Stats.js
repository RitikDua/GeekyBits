import React from 'react';
import Line from './Line';
import Pie from './Pie';
import Bar from './Bar';
export default function Stats() {
	return (
		<div>
			<Pie />
			<Bar />
			<Line />
		</div>
	)
}
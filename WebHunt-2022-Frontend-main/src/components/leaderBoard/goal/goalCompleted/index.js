import React, { useState } from 'react';

function GoalCompleted(props) {
	const [goalStatus, setGoalStatus] = useState({
		1: true,
		2: false,
		3: false,
		4: false,
	});
	return (
		<div className='wh-goal-completed wh-goal-completed-active'>
			<h1 className='wh-goal-completed-heading'>{props.index}.</h1>
			<span className='wh-goal-indicator wh-goal-indicator-completed'>1</span>
			<span className='wh-goal-indicator wh-goal-indicator-active'>2</span>
			<span className='wh-goal-indicator'>3</span>
			<span className='wh-goal-indicator'>4</span>
		</div>
	);
}

export default GoalCompleted;
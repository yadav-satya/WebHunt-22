import React, { useState } from 'react';

import './goal.css';

import GoalCompleted from './goalCompleted';

function Goal(props) {
	const [goalCompleted, setGoalCompleted] = useState([4, 4, 4, 3]);

	return (
		<div className='wh-leaderboard-goal-section'>
			<h1 className='wh-goal-heading'>Your Path</h1>
			<div className='wh-goal-containers'>
				{goalCompleted.map((goal, i) => {
					return <GoalCompleted goal={goal} index={i + 1} />;
				})}
			</div>
			<div className='wh-goal-target'>
				<span>THE GOAL</span>
				<h1>One Epic Ad (10%)</h1>
			</div>
		</div>
	);
}

export default Goal;
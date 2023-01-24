import React from 'react';

import './teamMember.css';

function TeamMember(Props) {
	return (
		<div className='wh-teamMember-container'>
			<div className='wh-teamMember-details'>
				<h1 className='wh-teamMember-name'>{Props.name}</h1>
			</div>
		</div>
	);
}

export default TeamMember;

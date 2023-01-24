import React from 'react';

import '../leaderBoard.css';

import { RiMedal2Line, RiMedalFill, RiMedalLine } from 'react-icons/ri';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { BsCircleFill, BsDash } from 'react-icons/bs';

function Team(props) {
	//console.log(props.team)
	return (
		<div className='wh-leaderboard-team'>
			<span className='wh-leaderboard-teamname'>{props.team.teamName}</span>
			<span className='wh-leaderboard-reward'>
				{Number(props.team.position) === 1 ? (
					<>
						<RiMedal2Line />
						<RiMedalFill />
						<RiMedalLine />
					</>
				) : Number(props.team.position) === 2 ? (
					<>
						<RiMedalFill />
						<RiMedalLine />
					</>
				) : Number(props.team.position) === 3 ? (
					<RiMedalLine />
				) : (
					''
				)}
			</span>
			<span className='wh-leaderboard-ranking'>
				<span
					className={`wh-leaderboard-ranking-status ${
						Number(props.team.change) === 1
							? 'wh-leaderboard-ranking-up'
							: Number(props.team.change) === -1
							? 'wh-leaderboard-ranking-down'
							: 'wh-leaderboard-ranking-stable'
					} `}>
					{Number(props.team.change) === 1 ? (
						<FaLongArrowAltUp />
					) : Number(props.team.change) === -1 ? (
						<FaLongArrowAltDown />
					) : (
						<BsDash />
					)}
				</span>
				<span className='wh-leaderboard-rank'>{props.team.position}</span>
				<span
					className={`wh-leaderboard-rank-symbol wh-leaderboard-rank-${props.team.position}`}>
					<BsCircleFill />
				</span>
			</span>
		</div>
	);
}

export default Team;
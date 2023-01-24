import React from 'react';
import { useEffect, useState } from 'react';
import './leaderBoard.css';
import axios from 'axios';
import Goal from './goal';
import Team from './team';
import config from '../../config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function LeaderBoardSection() {
	const refreshRate = 30000; //milliseconds
	const [teams, updateTeams] = useState([]);
	const dispatch = useDispatch();
	const updateLeaderboard = async (temp) => {
		const result = await axios.get(`${config.BACKEND_DOMAIN}leaderboard`);
		console.log(result.data);
		if (temp)
			updateTeams(result.data.leaderboard);
		return result.data.leaderboard;
	};
	useEffect(() => {
		let intervalId = "";
		let temp = true;
		const fetchLeaderBoard = async () => {
			try {
				dispatch({
					type: 'SHOW_LOADER'
				});
				await updateLeaderboard(temp);
				dispatch({
					type: 'REMOVE_LOADER'
				})
				intervalId = setInterval(async () => {
					try {
						dispatch({
							type: 'SHOW_LOADER'
						})
						await updateLeaderboard(temp);
					} catch (error) {
						console.log(error);
					}
					finally {
						dispatch({
							type: 'REMOVE_LOADER'
						})
					}
				}, refreshRate);
			} catch (error) {
				dispatch({
					type: 'REMOVE_LOADER'
				})
				toast(error.message);
				console.log(error);
			}
		}
		fetchLeaderBoard();
		return () => {
			temp = false;
			clearInterval(intervalId);
			console.log('clean up');
		}
	}, []);
	return (
		<div className='wh-leaderboard-section'>
			{/* <Goal totalQuestions='12' /> */}
			<div className='wh-leaderboard-attributes'>
				<span className='wh-leaderboard-teamname'>Team Name</span>
				<span className='wh-leaderboard-reward'>Reward</span>
				<span className='wh-leaderboard-ranking'>Ranking Place</span>
			</div>
			<div className='tessaract'></div>
			<div className='wh-leaderboard-container'>
				{teams.map((team, index) => (
					<Team key={index} team={team} />
				))}
			</div>
		</div>
	);
}

export default LeaderBoardSection;

import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './teams.css';
import statusCodes from "../../errCodes";
import config from '../../config';

function TeamSection() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);

	const [teamCode, setTeamCode] = useState('');
	const [teamName, setTeamName] = useState('');
	
	const [inputHidden,setInputHidden]=useState(true);
    const [inputType,setInputType]=useState(true);

    const addTeamData=(teamName,teamId)=>{
		console.log(teamName,teamId);
       dispatch({
		   type:'ADD_TEAM_DATA',
		   payload:{
			   teamName,
			   teamId
		   }
	   });
	}
	const handleTeamNameChange = (event) => {
		console.log(event.target.value);
		setTeamName(event.target.value)
	}
	const handleTeamCodeChange = (event) => {
		console.log(event.target.value);
		setTeamCode(event.target.value)
	}

	const handleTeamCreation = async () => {
		try {
			if (teamName.length === 0) {
				toast("Please enter a team name.");
				console.log("Please enter a team name.");
				return;
			}
			dispatch({
				type:'SHOW_LOADER'
			})
			const response = await axios.post(`${config.BACKEND_DOMAIN}team/create-team`,
				{
					teamName: teamName
				},
				{
					headers: {
						authtoken: user.authtoken,
					},
				}
			);
			dispatch({
				type:'REMOVE_LOADER'
			})
			if(response.status === statusCodes.CREATE_ERROR) {
				toast(response.data.message);
				return;
			}
			if(response.status === statusCodes.SUCCESS) {
				toast('Team Created Successfully')
				dispatch({
					type: 'NEW_MEMBER_ADDED',
					payload: response.data.teamMembers
				});
				const {teamName,teamId}=response.data.team;
				console.log(response.data);
				addTeamData(teamName,teamId);
			}
			navigate("/lobby");
			console.log(response.data);

		} catch (error) {
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log(error);
		}
	}

	const handleJoinTeam = async () => {
		try {
			if (teamCode.length !== 6) {
				toast('Please enter a valid team code');
				console.log('Please enter a valid team code');
			}
			dispatch({
				type:'SHOW_LOADER'
			})
			const response = await axios.post(`${config.BACKEND_DOMAIN}team/join-team`, {
				teamId: teamCode
			}, {
				headers: {
					authtoken: user.authtoken
				}
			});
			dispatch({
				type:'REMOVE_LOADER'
			})
			if(response.status === statusCodes.CREATE_ERROR) {
				toast(response.data.message);
				return;
			}
			if(response.status === statusCodes.SUCCESS_NOT_FOUND) {
				toast(response.data.message);
				return;
			}
			if(response.status === statusCodes.SUCCESS_TEAM_FULL) {
				toast(response.data.message);
				return;
			}
			if(response.status === statusCodes.SUCCESS) {
				toast('team joined successfully')
				dispatch({
					type: 'NEW_MEMBER_ADDED',
					payload: response.data.teamMembers
				});
				const {teamName,teamId}=response.data.team;
				console.log(response.data);
				addTeamData(teamName,teamId);
			}
			navigate("/lobby")
		}
		catch (error) {
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log(error);
		}
	}

	const onJoinTeamClick=()=>{
		setInputHidden((prevValue)=>{
			return !prevValue;
		});
		setInputType(true);
	}

	const onCreateTeamClick=()=>{
		setInputHidden((prevValue)=>{
			return !prevValue;
		});
		setInputType(false);
	}

    const handleBack=()=>{
		setInputHidden(true);
		setInputType(true);
	}

	const getComponent = () => {
		if(user.teamName) {
			return <><p className='already-in-team' style={{color:"white"}}>You are already in team {user.teamName}. </p>
			<br/>
			 <p className='team-id'>TeamId: {user.teamId} </p>
			 </>
		}
		return (inputHidden? 
			<div className='team-buttons'>
		   <button onClick={onJoinTeamClick}>Join team</button>
		   <button onClick={onCreateTeamClick}>Create team</button>
		   </div>
		   :
		   inputType?
			   <div className='team-options'>
				   <input onChange={handleTeamCodeChange} className='team-input' type='text' placeholder='Enter team code' />
				   <div className='save-options'>
				   <button onClick={handleJoinTeam}>Join Team</button>
				   <button onClick={handleBack}>Back</button>
				   </div>
			   </div>
		   :
		   <div>
				 <div className='team-options'>
				   <input onChange={handleTeamNameChange} className='team-input' type='text' placeholder='Enter team name' />
				   <div className='save-options'>
				   <button onClick={handleTeamCreation}>Create Team</button>
				   <button onClick={handleBack}>Back</button>
				   </div>
			   </div>
		   </div>)
	};	

	return (
		<>
			<div className='team-page'>
				<div className='team-image-top'>
				</div>
				
				<div className='team-content'>
					<div className='team-heading'> 
					<h4 >Join your </h4>
					<h1 >Squad</h1>
					</div>

                    {
						getComponent()
					}
				</div>
				<div className='team-image-bottom'>
				</div>
				
			</div>
		</>
	);
}

export default TeamSection;

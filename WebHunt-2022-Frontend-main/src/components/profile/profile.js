import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';

import TeamMember from '../teamMember';
import LabelInput from '../labelInput';
import { MdOutlineEdit } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';

function ProfileSection() {
	const { user, teamMembers } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [editButtonActive,setEditButtonActive]=useState(false);

	const handleEdit=()=>{
		setEditButtonActive((prevValue)=>{
              return !prevValue;
		});
	}

	const [userDetails, setUserDetails] = useState({
		mobileNumber: user?.mobileNumber | '',
		rollNumber: user ? user.rollNumber : '',
		name: user ? user.name : '',
		email: user ? user.email : '',
	});
	const [teamMembersDetails, updateTeamMembersDetails] = useState(
		teamMembers ? teamMembers : []
	);
	// console.log(userDetails);
	useEffect(() => {
		setUserDetails({
			mobileNumber: user ? user.mobileNumber : '',
			rollNumber: user ? user.rollNumber : '',
			name: user ? user.name : '',
			email: user ? user.email : '',
		});
		console.log(teamMembersDetails);
		updateTeamMembersDetails(teamMembers ? teamMembers : []);
	}, [user, teamMembers]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserDetails((prevValues) => {
			return {
				...prevValues,
				[name]: value,
			};
		});
		console.log(userDetails);
	};

	const handleSubmit = async () => {
		if (!user) {
			toast('Please Login First !!')
			return;
		}
		console.log(userDetails);
		try {
			  dispatch({
				  type:'SHOW_LOADER'
			  })
			let result = await axios.post(
				`${config.BACKEND_DOMAIN}auth/profile`,
				{
					name: userDetails.name,
					mobileNumber: userDetails.mobileNumber,
					rollNumber: userDetails.rollNumber,
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
             toast('Profile Updated Successfully')
			dispatch({
				type: 'UPDATE_USER',
				payload: { authtoken: user.authtoken, ...result.data.user },
			});
			console.log(result.data);
		} catch (error) {
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log(error);
		}
	};

	return (
		<div className='wh-profile-section'>
			<div className='wh-image-top'>
             
			</div>
			<div className='wh-image-right'>
			<div className='wh-techspardha-logo'>

            </div>
			</div>
			<div className='wh-image-left'>
				 
			</div>
			<div className='wh-profile-container'>
				<div className='wh-photo-section'>
				<button onClick={handleEdit} className='wh-editProfile-btn'>
						<MdOutlineEdit size='20' />
						Edit Profile
					</button>
					<div className='wh-bg-photo'></div>
				</div>
				<div className='wh-profile-detail-section'>
					<LabelInput
						key='name'
						name='name'
						label='Name'
						placeholder='Name'
						value={userDetails.name}
						onChange={handleChange}
						readOnly={editButtonActive?"":"readOnly"}
					/>

					<LabelInput
						key='email'
						name='email'
						label='Email'
						placeholder='eg. xyz@gmail.com'
						readOnly={"readOnly"}
						value={userDetails.email}
						onChange={handleChange}
					/>
					<LabelInput
						key='mobileNumber'
						name='mobileNumber'
						label='Phone Number'
						placeholder='eg. 987654321'
						value={userDetails.mobileNumber}
						onChange={handleChange}
						readOnly={editButtonActive?"":"readOnly"}
					/>
					<LabelInput
						key='rollNumber'
						name='rollNumber'
						label='Roll Number'
						placeholder='eg. 11719877'
						value={userDetails.rollNumber}
						onChange={handleChange}
						readOnly={editButtonActive?"":"readOnly"}
					/>
					{
						editButtonActive?
						<button
						className='wh-saveProfile-btn'
						onClick={handleSubmit}>
						Save
					</button>
					:
					<div>

					</div>
					}
				</div>
			</div>
			<div className='wh-team-container'>
				<h1 className='wh-team-title'>Team Members</h1>
				<div className='wh-team-members'>
					{teamMembersDetails.map((element, index) => {
						return <TeamMember key={index} name={element}></TeamMember>;
					})}
				</div>
			</div>

		</div>
	);
}

export default ProfileSection;

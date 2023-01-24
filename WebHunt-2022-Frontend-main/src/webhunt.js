import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';



import './webhunt.css';
import Notification from './components/Notification/Notification';
import Home from './containers/home';
import Signin from './containers/signIn';
import Signup from './containers/signUp';
import Lobby from './containers/lobby';
import QuestionSection from './components/questions/questions';
import TeamSection from './components/teams/teams';
import ProfileSection from './components/profile/profile';
import LeaderBoardSection from './components/leaderBoard/leaderBoard';
import DeveloperSection from './components/devs/devs';
import config from './config';
import Loader from './components/Loader/Loader';


const auth = getAuth();

function Webhunt() {
	const dispatch = useDispatch();
	const { user , loading} = useSelector((store) => store);
	useEffect(() => {
		try {
			onAuthStateChanged(auth, async (user) => {
				// console.log(user);
				// console.log(config.BACKEND_DOMAIN)
				if (user) {
					const authtoken = await user.getIdToken(false);
					const response = await axios.post(
						`${config.BACKEND_DOMAIN}auth/login`,
						{},
						{
							headers: {
								authtoken: authtoken,
							},
						}
					);
					console.log(response.data);
					dispatch({
						type: 'SIGN_IN',
						payload: {
							...response.data.user,
							authtoken: authtoken,
						},
					});

					dispatch({
						type: 'TEAM_MEMBERS',
						payload: response.data.teamMembers
					})
				} else {
					dispatch({ type: 'SIGN_OUT', payload: null });
				}
			});
		} catch (error) {
			toast(error.message);
			console.log(error);
		}
	}, []);
	return (
		<div className='webhunt'>
			{loading&&<Loader/>}
			<Router>
				<Routes>
					<Route index element={<Home />} />
					{!user && <Route path='signin' element={<Signin />} />}
					{!user && <Route path='signup' element={<Signup />} />}
					{user && <Route path='lobby' element={<Lobby />}>
						<Route index element={<QuestionSection />} />
						<Route path='dashboard' element={<QuestionSection />} />
						<Route path='teams' element={<TeamSection />} />
						<Route path='profile' element={<ProfileSection />} />
						<Route
							path='leaderboard'
							element={<LeaderBoardSection />}
						/>
						<Route
							path='Developers'
							element={<DeveloperSection />}
						/>
						<Route path='*' element={<Navigate to="/dashboard" />} />
					</Route>}
					<Route path='*' element={<Navigate to="" />} />
				</Routes>
			</Router>
			<Notification/>
		</div>
	);
}

export default Webhunt;

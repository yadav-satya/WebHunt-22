import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './home.css';

import { Button } from '../../components/button';
import PreLoader from '../../components/preLoader';

function HomePage() {
	const { user } = useSelector((store) => store);
	const [showPreLoader, setShowPreLoader] = useState(true);
	const navigate = useNavigate();

	const redirectToSignIn = () => {
		navigate('/signin');
	};
	const redirectToSignUp = () => {
		navigate('/signup');
	};
	const redirectToDashboard = () => {
		navigate('/lobby');
	};

	useEffect(() => {
		setTimeout(() => {
			setShowPreLoader(false);
		}, 5000);
	}, []);

	// return (
	// 	<div className='wh-home-page'>
	// 		{showPreLoader ? (
	// 			<PreLoader />
	// 		) : (
	// 		<div className='wh-home-container'>
	// 			<div className='wh-home-nav-section'>
	// 				<Button
	// 					appearance='subtle'
	// 					text='SignIn'
	// 					onClick={redirectToSignIn}
	// 				/>
	// 				<Button
	// 					appearance='subtle'
	// 					text='SignUp'
	// 					onClick={redirectToSignUp}
	// 				/>
	// 			</div>
	// 			<div className='wh-home-main-section'>
	// 				<div className='wh-home-heading'>WEB HUNT</div>
	// 				<img className='darth' src={darth} alt='darth varder'/>
	// 			</div>
	// 		</div>
	// 		)}
	// 	</div>
	// );

	const getComponent = () => {
		if (showPreLoader) {
			return <PreLoader />;
		}
		// if (user) {
		// 	navigate('/lobby');
		// }
		return (
			<div className='background'>
				<div>
					<div className='wh-home-nav-section'>
						{!user ? (
							<>
								<Button
									appearance='subtle'
									text='SignIn'
									onClick={redirectToSignIn}
								/>
								<Button
									appearance='subtle'
									text='SignUp'
									onClick={redirectToSignUp}
								/>
							</>
						) : (
							<Button
								appearance='subtle'
								text='Dashboard'
								onClick={redirectToDashboard}
							/>
						)}
					</div>
					<div className='middle-section'>
						<div className='tag-box'>WEBHUNT</div>
						<div className='techspardha-image'></div>
						<div className='left-side-image'></div>
						<div className='landing-page-image'></div>
					</div>
				</div>
			</div>
		);
	};

	return getComponent();
}

export default HomePage;

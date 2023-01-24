import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import './lobby.css';

import Navbar from '../../components/navBar';

function Lobby() {
	const name = useSelector((store) =>
		store.user ? store.user.name : 'no user '
	);
	return (
		<div className='wh-lobby-page'>
			<div className='wh-navBar-section'>
				<Navbar />
			</div>
			<div className='wh-main-section'>
				<div className='wh-heading-section'>
					<h1>{name}</h1>
				</div>
				<div className='wh-content-section'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Lobby;

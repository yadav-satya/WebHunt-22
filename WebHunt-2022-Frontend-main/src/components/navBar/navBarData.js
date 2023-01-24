import React from 'react';

import { MdOutlineLeaderboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiTeamLine } from 'react-icons/ri';
import { FaFire } from 'react-icons/fa';

export const NavbarData = [
	{
		title: 'Dashboard',
		path: '/lobby/dashboard',
		icon: <FaFire size='28' />,
		cName: 'wh-menu-item',
	},
	{},
	{
		title: 'Profile',
		path: '/lobby/profile',
		icon: <CgProfile size='26' />,
		cName: 'wh-menu-item',
	},
	{
		title: 'Leaderboard',
		path: '/lobby/leaderboard',
		icon: <MdOutlineLeaderboard size='25' />,
		cName: 'wh-menu-item',
	},
	// {
	// 	title: 'Results',
	// 	path: '/lobby/results',
	// 	icon: <FaFortAwesome />,
	// 	cName: 'wh-menu-item',
	// },
	{
		title: 'Team',
		path: '/lobby/teams',
		icon: <RiTeamLine size='25' />,
		cName: 'wh-menu-item',
	},
	{},
	// {
	// 	title: 'Developers',
	// 	path: '/lobby/Developers',
	// 	icon: <FaIdBadge />,
	// 	cName: 'wh-menu-item',
	// },
];

import React from 'react';

import './navBar.css';

import { MdOutlineLogout } from 'react-icons/md';
import MicroBusLogo from '../../assets/images/mblogo.png';

import { NavbarData } from './navBarData';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';


function Navbar() {
	const navigate = useNavigate();
    const dispatch=useDispatch();
	const redirectToOtherMenu = (path) => {
		console.log(path);
		navigate(path);
	};

	const handleLogout = () => {
		const auth=getAuth();
		dispatch({
			type:'SHOW_LOADER'
		});
		signOut(auth).then(()=>{
			dispatch({
				type:'REMOVE_LOADER'
			})
			console.log('sign out successfull');
			toast('Signed Out Successfully')
			navigate('/signin');
		}).catch((error)=>{
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log('sign out error'+ error);
		})
	};

	return (
		<div className='wh-navBar'>
			<div className='wh-logo'>
				<img src={MicroBusLogo} alt='MicroBus logo' />
			</div>
			<div className='wh-menu-items'>
				{NavbarData.map((item, index) => {
					if (index === 1 || index === 5) {
						return <hr key={index} className='wh-divider' />;
					} else
						return (
							<div
								key={index}
								className={item.cName}
								onClick={() => redirectToOtherMenu(item.path)}>
								{item.icon}
								<span className='wh-menu-item-span'>
									{item.title}
								</span>
							</div>
						);
				})}
				<div className='wh-menu-item '>
					<MdOutlineLogout size='25'  onClick={handleLogout} />
					<span className='wh-menu-item-span' onClick={handleLogout}>Logout</span>
				</div>
			</div>
		</div>
	);
}

export default Navbar;

// eslint-disable-next-line no-lone-blocks
{
	/* <IconContext.Provider value={{ color: '#fff' }}>
	<div className='navbar'>
		<Link to='#' className='menu-bars'>
			<FaBars onClick={showSidebar} />
		</Link>
	</div>
	<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
		<ul className='nav-menu-items' onClick={showSidebar}>
			<li className='navbar-toggle'>
				<Link to='#' className='menu-bars'>
					<AiOutlineClose />
				</Link>
			</li>
			{NavbarData.map((item, index) => {
				return (
					<li key={index} className={item.cName}>
						<Link to={item.path}>
							{item.icon}
							<span className='wh-span'>{item.title}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	</nav>
</IconContext.Provider>; */
}

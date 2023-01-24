import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import './signin.css';
import { Button } from '../../components/button';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const auth = getAuth();
const provider = new GoogleAuthProvider();

function Signin() {
	const navigate = useNavigate();
    const dispatch=useDispatch();
	const emailRef = useRef();
	const passwordRef = useRef();

	const submitHandler = async (event) => {
		try {
			console.log('ran');
			event.preventDefault();
			const email = emailRef.current.value;
			const password = passwordRef.current.value;
            dispatch({
				type:'SHOW_LOADER'
			})
			await signInWithEmailAndPassword(auth, email, password);
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast('Signed In Successfully')
			navigate('/lobby');
		}
		catch (error) {
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log(error);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			dispatch({
				type:'SHOW_LOADER'
			})
			await signInWithPopup(auth, provider);
			dispatch({
				type:'REMOVE_LOADER'
			})
            toast('Signed In Successfully')
			navigate('/lobby');
		}
		catch (error) {
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log(error);
		}
	};

	const handleFailure = (res) => {
		alert(res);
	};

	return (
		<div className='signin-body'>
			<div className='techspardha-heading'></div>
			<div className='signin-left'></div>
			<div className='signin-right'>
				<div className='signin-card'>
					<h2>Log In</h2>
					<h5>Welcome Back!</h5>
					<button className='sign-in-box' onClick={handleGoogleLogin}>
						{' '}
						<FcGoogle className='google-icon' /> Sign in with Google{' '}
					</button>
					<p>Or</p>
					<form onSubmit={submitHandler}>
						<div className='signin-inputs'>
							<label>Email</label>
							<input
								ref={emailRef}
								type='email'
								name='email'
								placeholder='eg. xyz@gmail.com'
								required
							/>
							<label>Password</label>
							<input
								ref={passwordRef}
								name='password'
								type='password'
								placeholder='Password'
								required
							/>
							<button className='login-box' type='submit'>
								{' '}
								Log In{' '}
							</button>
						</div>
					</form>
					<span>
						Not a member?
						<Link className='link-text' to='/signup'>
							{' '}
							Get Started
						</Link>
					</span>
				</div>
			</div>
			<div className='sign-in-rightmost'></div>
		</div>
	);
}

export default Signin;

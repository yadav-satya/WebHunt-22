import React, { useDebugValue, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const auth = getAuth();
function Signup() {
	const [error, setError] = useState(null);
	const dispatch=useDispatch();
	//const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const repasswordRef = useRef();
	const navigate = useNavigate();


	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const email = emailRef.current.value;
			const password = passwordRef.current.value;
			const repassword = repasswordRef.current.value;
			if (password !== repassword) {
				toast('Please enter same passwords')
				setError('Please enter same passwords');
				return;
			}
			dispatch({
				type:'SHOW_LOADER'
			})
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast('Account Created Successfully');
			navigate("/lobby");
		}
		catch (error) {
			dispatch({
				type:'REMOVE_LOADER'
			})
			toast(error.message);
			console.log(error);
		}
	};

	return (

		<div className='signup-body'>
			<div className="signup-left">

			</div>
			<div className='signup-right'>
				<div className='signup-card'>
					<h2>Create Account</h2>
					<form onSubmit={submitHandler}>
						<div className="signup-inputs">
							<label >
								Email
							</label>
							<input ref={emailRef}
								name="email"
								type="text"
								required />
							<label >
								Password
							</label>
							<input ref={passwordRef}
								name="password"
								type="password"
								required />
							<label >
								Re-enter Password
							</label>
							<input ref={repasswordRef}
								name="reEnterPassword"
								type="password"
								required />
							<button type="submit"> Create Account </button>
						</div>
					</form>

				</div>
			</div>

		</div>
	);
}

export default Signup;

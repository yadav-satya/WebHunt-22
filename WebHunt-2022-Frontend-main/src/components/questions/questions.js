import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';
import Countdown from 'react-countdown';

import './questions.css';
import statusCodes from '../../errCodes';
import config from '../../config';
import { toast } from 'react-toastify';
import CountDownComponent from '../countDown/countdown';

function QuestionSection() {
	const { user } = useSelector((state) => state);
	const [notInteam, setNotInteam] = useState(false);
	const dispatch = useDispatch();
	const [nextQuestionLoading, setNextQuestionLoading] = useState(false);
	const [contestState, setContestState] = useState('');
	const [question, setQuestion] = useState({
		questionNo: '',
		questionURL: '',
	});
	const [answer, setAnswer] = useState('');
	const startDateTime = new Date(config.START_TIME);
	const [allDone, setAllDone] = useState(false);

	useEffect(async () => {
		try {
			if (!user) {
				toast('Please Login First');
				console.log('please login first !!');
				return;
			}
			dispatch({
				type: 'SHOW_LOADER',
			});
			const response = await axios.get(
				`${config.BACKEND_DOMAIN}questions`,
				{
					headers: {
						authtoken: user.authtoken,
					},
				}
			);
			dispatch({
				type: 'REMOVE_LOADER',
			});
			if (response.status === statusCodes.SUCCESS_NOT_IN_TEAM) {
				setNotInteam(true);
				return;
			}

			if (response.status === statusCodes.SUCCESS_EVENT_NOT_START) {
				setContestState('NOT_STARTED');
				return;
			}
			
			if (response.status === statusCodes.SUCCESS_EVENT_ENDED) {
				setContestState('ENDED');
				return;
			}
			
			if (response.status === statusCodes.SUCCESS_ALL_DONE) {
				setContestState('RUNNING');
				setAllDone(true);
				return;
			}

			setContestState('RUNNING');
			setQuestion(response.data);
		} catch (error) {
			dispatch({
				type: 'REMOVE_LOADER',
			});
			toast(error.message);
			console.log(error.message);
		}
	}, [user]);
	const handleSubmitAnswer = async () => {
		try {
			if (!user) {
				toast('Please Login First');
				console.log('please login first !!');
				return;
			}
			dispatch({
				type: 'SHOW_LOADER',
			});
			const result = await axios.post(
				`${config.BACKEND_DOMAIN}questions`,
				{
					teamAns: answer,
				},
				{
					headers: {
						authtoken: user.authtoken,
					},
				}
			);
			dispatch({
				type: 'REMOVE_LOADER',
			});

			if (result.status === statusCodes.SUCCESS_NOT_IN_TEAM) {
				setNotInteam(true);
				return;
			}

			if (result.status === statusCodes.SUCCESS_WRONG_ANS) {
				toast('Your answer is wrong. Please try again !!');
				console.log('Your answer is wrong. Please try again !!');
			} else {
				toast('Correct Answer');
				dispatch({
					type: 'SHOW_LOADER',
				});
				const result = await axios.get(
					`${config.BACKEND_DOMAIN}questions`,
					{
						headers: {
							authtoken: user.authtoken,
						},
					}
				);
				if (result.status === statusCodes.SUCCESS_ALL_DONE) {
					setAllDone(true);
					dispatch({
						type: 'REMOVE_LOADER',
					});
					return;
				}
				setTimeout(() => {
					setQuestion(result.data);
					setNextQuestionLoading(false);
					setAnswer('');
					dispatch({
						type: 'REMOVE_LOADER',
					});
					console.log(result.data, 'after timeout');
				}, 2000);
			}
		} catch (error) {
			dispatch({
				type: 'REMOVE_LOADER',
			});
			toast(error.message);
			console.log(error);
		}
	};
	const handleAnswerChange = (event) => {
		setAnswer(event.target.value);
	};

	const showUI = ({ days, hours, minutes, seconds, completed }) => {
		// console.log(days, hours, minutes, seconds);
		if (completed) {
			//console.log('in if');
			switch (contestState) {
				case 'NOT_STARTED':
					return (
						<div>
							<p style={{ color: 'white' }}>
								Contest not started!
							</p>
						</div>
					);

				case 'RUNNING':
					return (
						<div className='wh-question-section'>
							<div className='wh-question'>
								<p>{question.questionNo}</p>
								<div>
									{allDone && <p id='all-done-tag'>All Questions are done</p>}
									{!allDone && <img width="400" 
										alt='questionImage'
										src={question.questionURL}></img>}
								</div>
							</div>
							<div className='wh-answer'>
								<div className='wh-answer-container'>
									<input
										placeholder='Type your answer...'
										value={answer}
										onChange={handleAnswerChange}
									/>
									<button onClick={handleSubmitAnswer}>
										<AiOutlineSend />
									</button>
								</div>
							</div>
						</div>
					);

				case 'ENDED':
					return <p style={{ color: 'white' }}>Contest Ended!</p>;

				default:
					return <p>Something wrong happend!</p>;
			}
		} else {
			return (
				<CountDownComponent
					dateTime={{ days, hours, minutes, seconds }}
				/>
			);
		}
	};

	const getComponent = () => {
		return (
			<Countdown
				style={{ color: 'white' }}
				date={startDateTime.getTime()}
				renderer={showUI}
			/>
		);
	};

	return (
		<>
			{notInteam && (<p className="team-join-note">Please Join or create team</p>)}
			 {getComponent()}
		</>
	);
}

export default QuestionSection;

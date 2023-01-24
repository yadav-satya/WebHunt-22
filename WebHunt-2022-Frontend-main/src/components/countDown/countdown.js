import './countDown.css';

const CountDownComponent = ({ dateTime }) => {
	let { days, hours, minutes, seconds } = dateTime;
	hours = Number(hours);
	seconds = Number(seconds);
	minutes = Number(minutes);

	return (
		<div className='container'>
			<h1 id='headline'>Contest start in </h1>
			<div id='countdown'>
				<ul>
					<li>
						<span id='hours'></span>{hours}
					</li>
					<li>:</li>
					<li>
						<span id='minutes'></span>{minutes}
					</li>
					<li>:</li>
					<li>
						<span id='seconds'></span>{seconds}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CountDownComponent;


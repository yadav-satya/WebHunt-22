import React, { useState } from 'react';

import './preLoader.css';

import { useSpring, animated, config } from 'react-spring';

function PreLoader() {
	const [flip, set] = useState(false);

	const words = [
		'We',
		'came',
		'back.',
		'We',
		'saw.',
		'We',
		'kicked',
		'its',
		'ass.',
	];

	const { scroll } = useSpring({
		scroll: (words.length - 1) * 100,
		from: { scroll: 0 },
		reset: true,
		reverse: flip,
		delay: 200,
		config: config.molasses,
		onRest: () => set(!flip),
	});

	return (
		<div className='preLoader'>
			<animated.div
				style={{
					position: 'relative',
					width: '100%',
					height: 100,
					overflow: 'auto',
					fontSize: '5em',
				}}
				scrollTop={scroll}>
				{words.map((word, i) => (
					<div
						key={`${word}_${i}`}
						style={{
							width: '100%',
							height: 100,
							textAlign: 'center',
                            color: 'white'
						}}>
						{word}
					</div>
				))}
			</animated.div>
		</div>
	);
}

export default PreLoader;

import React from 'react';

import './labelInput.css';

function LabelInput(props) {
	const {label,placeholder,...otherProps}=props;
	const {readOnly}=props;
	return (
		<div className='wh-label-input-container'>
			<h2 className='wh-label'>{label}</h2>
			<input className= {`wh-input ${readOnly}`} placeholder={placeholder} {...otherProps} />
		</div>
	);
}

export default LabelInput;

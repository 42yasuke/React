import React from 'react';

function Square (props) {
	return <button onClick={props.onCLick}>{props.label}</button>;
}

export default Square;
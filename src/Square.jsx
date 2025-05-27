import React from 'react';
import './Square.css';

function Square ({onClick, value, index}) {
	return (<button 
				onClick={() => onClick(index)}
				className="square">
					{value}
			</button>);
}

export default Square;
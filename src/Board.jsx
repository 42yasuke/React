import React from 'react';
import './Board.css';

import Square from './Square';

function Board ({squares, handleClick}) {
	return (<div className="board">
				{squares.map((value, index) => (
					<Square 
						key={index}
						onClick={handleClick}
						value={value}
						index={index}
					/>
				))}
			</div>);
}

export default Board;
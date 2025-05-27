import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [isFinished, setIsFinished] = useState([false, false, false]);
	const [status, setStatus] = useState("C'est au tour de X");

	function handleClick(index) {
		if (squares[index] || isFinished[0]) return;
		const newSquares = [...squares];
		newSquares[index] = isXNext ? 'X' : 'O';
		if (isXNext) setStatus("C'est au tour de X");
		else setStatus("C'est au tour de O");
		setSquares(newSquares);
		setIsXNext(!isXNext);
		calculateWinner(newSquares);
	}

	function calculateWinner(squares) {
		const tab = squares.map((value) => {
			if (!value) return 0;
			if (value === 'X') return 1;
			return 4;
		});

		const isXWinner = tab[0] + tab[1] + tab[2] === 3 || // par ligne
					tab[3] + tab[4] + tab[5] === 3 ||
					tab[6] + tab[7] + tab[8] === 3 ||
					tab[0] + tab[3] + tab[6] === 3 || // par colone
					tab[1] + tab[4] + tab[7] === 3 ||
					tab[2] + tab[5] + tab[8] === 3 ||
					tab[0] + tab[4] + tab[8] === 3 || // par diagonale
					tab[2] + tab[4] + tab[6] === 3;

		const isOWinner = tab[0] + tab[1] + tab[2] === 12 || // par ligne
					tab[3] + tab[4] + tab[5] === 12 ||
					tab[6] + tab[7] + tab[8] === 12 ||
					tab[0] + tab[3] + tab[6] === 12 || // par colone
					tab[1] + tab[4] + tab[7] === 12 ||
					tab[2] + tab[5] + tab[8] === 12 ||
					tab[0] + tab[4] + tab[8] === 12 || // par diagonale
					tab[2] + tab[4] + tab[6] === 12;

		const isTheEnd = isXWinner || isOWinner || !tab.includes(0);

		setIsFinished([isTheEnd, isXWinner, isOWinner]);
	}

	function reStart() {
		setSquares(Array(9).fill(null));
		setIsFinished([false, false, false]);
		if (isXNext) setStatus("C'est au tour de X");
		else setStatus("C'est au tour de O");
	}

	useEffect(() => {
		if (isFinished[0]) {
			if (isFinished[1]) setStatus("X a gagné 🎉");
			else if (isFinished[2]) setStatus("O a gagné 🎉");
			else setStatus("Match nul 🤝");
		}
	}, [isFinished]);

	return (
		<>
			<div className="status">
				<p>{status}</p>
			</div>
			<div className="board">
				{squares.map((value, index) => (
					<button 
						key={index} 
						className="square" 
						onClick={() => handleClick(index)}>
							{value}
					</button>
				))}
			</div>
			{isFinished[0] &&
				<div className="status">
					<button onClick={reStart}>REJOUER</button>
				</div>
			}
		</>
	);
}

export default App;

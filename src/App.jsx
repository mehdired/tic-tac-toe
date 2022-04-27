import { useState, useEffect } from 'react'

import { checkColumn, checkLine, checkDiagonalA, checkDiagonalB } from './utils/checkLines'
import './App.css'
import Cell from './components/Cell'

const nbrRowsColumns = 3
const arrayTable = Array.from({ length: nbrRowsColumns }, () =>
	Array.from({ length: nbrRowsColumns }, () => '')
)

export default function App() {
	const [player, setPlayer] = useState('O')
	const [winner, setWinner] = useState('')
	const [board, setBoard] = useState(arrayTable)

	const isWinner = () => {
		return (
			checkLine(board) || checkColumn(board) || checkDiagonalA(board) || checkDiagonalB(board)
		)
	}

	const isTie = () => {
		return board.every((row) => row.every((cell) => cell !== ''))
	}

	const resetGame = () => {
		setBoard(
			Array.from({ length: nbrRowsColumns }, () =>
				Array.from({ length: nbrRowsColumns }, () => '')
			)
		)
		setPlayer('O')
		setWinner('')
	}

	useEffect(() => {
		if (isWinner()) {
			setWinner(player)
		}

		if (isTie()) {
			setWinner('no one')
		}

		if (!winner) {
			const newPlayer = player === 'X' ? 'O' : 'X'

			setPlayer(newPlayer)
		}
	}, [board])

	useEffect(() => {
		const classFunction = winner ? 'add' : 'remove'

		document.querySelectorAll('.ttt-cell').forEach((element) => {
			element.classList[classFunction]('disable')
		})
	}, [winner])

	return (
		<div className="ttt-container">
			<div>
				{!winner && <p>Turn : {player}</p>}

				<table className="ttt-table">
					<tbody>
						{board.map((row, rowIndex) => (
							<tr key={`row${rowIndex}`}>
								{row.map((cell, cellIndex) => (
									<Cell
										value={cell}
										cellIndex={cellIndex}
										rowIndex={rowIndex}
										setBoard={setBoard}
										player={player}
										key={`cell${cellIndex}`}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>

				{winner && (
					<div>
						<p>{winner} is the winner</p>
						<button onClick={resetGame}>Reset the game</button>
					</div>
				)}
			</div>
		</div>
	)
}

import { useState, useEffect } from 'react'
import './App.css'

const nbrRowsColumns = 3
const arrayTable = Array.from({ length: nbrRowsColumns }, () =>
	Array.from({ length: nbrRowsColumns }, () => '')
)

export default function App() {
	const [player, setPlayer] = useState('O')
	const [winner, setWinner] = useState('')
	const [board, setBoard] = useState(arrayTable)

	const onClickCell = (event, row, cell) => {
		event.target.classList.add('disable')

		setBoard((prevBoard) => {
			const newBoard = [...prevBoard]
			newBoard[row][cell] = player

			return newBoard
		})
	}

	const checkIsWinner = () => {
		const checkLine = board.some((row) => {
			return row.every((cell) => cell === row[0] && cell.length > 0)
		})

		const checkColumn = board
			.map((_, index) => board.map((cell) => cell[index]))
			.some((row) => row.every((cell) => cell === row[0] && cell.length > 0))

		const checkDiagonalA = board
			.reduce((merged, row, rowIndex) => {
				row.forEach((cell, cellIndex) => {
					if (rowIndex === cellIndex) {
						merged.push(cell)
					}
				})
				return merged
			}, [])
			.every((cell, _, array) => cell === array[0] && cell.length > 0)

		const checkDiagonalB = board
			.reduce((merged, row, rowIndex) => {
				row.forEach((cell, cellIndex) => {
					if (rowIndex + cellIndex === row.length - 1) {
						merged.push(cell)
					}
				})
				return merged
			}, [])
			.every((cell, _, array) => cell === array[0] && cell.length > 0)

		return checkLine || checkColumn || checkDiagonalA || checkDiagonalB
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
		if (checkIsWinner()) {
			setWinner(player)
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
									<td
										className="ttt-cell"
										onClick={(event) => onClickCell(event, rowIndex, cellIndex)}
										key={`cell${cellIndex}`}
									>
										{cell}
									</td>
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

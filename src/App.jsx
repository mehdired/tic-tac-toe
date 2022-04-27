import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { checkColumn, checkLine, checkDiagonalA, checkDiagonalB } from './utils/checkLines'
import Cell from './components/Cell'

const nbrRowsColumns = 3
const arrayTable = Array.from({ length: nbrRowsColumns }, () =>
	Array.from({ length: nbrRowsColumns }, () => '')
)

const StyledTable = styled.table`
	border-collapse: collapse;
`

const StyledContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

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
		<StyledContainer>
			<div>
				{!winner && <p>Turn : {player}</p>}

				<StyledTable>
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
				</StyledTable>

				{winner && (
					<div>
						<p>{winner} is the winner</p>
						<button onClick={resetGame}>Reset the game</button>
					</div>
				)}
			</div>
		</StyledContainer>
	)
}

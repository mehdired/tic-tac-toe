export default function Cell({ value, player, cellIndex, rowIndex, setBoard }) {
	const onClickCell = (event) => {
		event.target.classList.add('disable')

		setBoard((prevBoard) => {
			const newBoard = [...prevBoard]
			newBoard[rowIndex][cellIndex] = player

			return newBoard
		})
	}

	return (
		<td className="ttt-cell" onClick={(event) => onClickCell(event)}>
			{value}
		</td>
	)
}

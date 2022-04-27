import styled from 'styled-components'

const StyledCell = styled.td`
	border: 1px solid #000;
	border-collapse: collapse;
	width: 100px;
	height: 100px;
	text-align: center;
	cursor: pointer;
	pointer-events: ${(props) => props.disable && 'none'};

	&:active {
		background-color: #efefef;
	}
`

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
		<StyledCell disable={value ? true : false} onClick={(event) => onClickCell(event)}>
			{value}
		</StyledCell>
	)
}

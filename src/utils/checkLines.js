function checkLine(array) {
	return array.some((row) => {
		return row.every((cell) => cell === row[0] && cell.length > 0)
	})
}

function checkColumn(array) {
	return array
		.map((_, index) => array.map((cell) => cell[index]))
		.some((row) => row.every((cell) => cell === row[0] && cell.length > 0))
}

function checkDiagonalA(array) {
	return array
		.reduce((merged, row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				if (rowIndex === cellIndex) {
					merged.push(cell)
				}
			})
			return merged
		}, [])
		.every((cell, _, currentArray) => cell === currentArray[0] && cell.length > 0)
}

function checkDiagonalB(array) {
	return array
		.reduce((merged, row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				if (rowIndex + cellIndex === row.length - 1) {
					merged.push(cell)
				}
			})
			return merged
		}, [])
		.every((cell, _, currentArray) => cell === currentArray[0] && cell.length > 0)
}

export { checkLine, checkColumn, checkDiagonalA, checkDiagonalB }

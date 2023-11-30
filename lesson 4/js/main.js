let currentPlayer = 'player__first'
let board__item = document.querySelectorAll('.board__item')
let counter = 0
let gameOver = false

const winCombinations = [
	[0, 1, 2],
	[0, 4, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
]

const togglePlayer = () => {
	currentPlayer =
		currentPlayer === 'player__first' ? 'player__second' : 'player__first'
}

const checkWin = () => {
	for (const combo of winCombinations) {
		const [a, b, c] = combo
		if (
			board__item[a].classList.contains('player__first') &&
			board__item[b].classList.contains('player__first') &&
			board__item[c].classList.contains('player__first')
		) {
			setTimeout(() => {
				alert('Игрок 1 выиграл!')
				resetGame()
			}, 100)
			gameOver = true
			break
		} else if (
			board__item[a].classList.contains('player__second') &&
			board__item[b].classList.contains('player__second') &&
			board__item[c].classList.contains('player__second')
		) {
			setTimeout(() => {
				alert('Игрок 2 выиграл!')
				resetGame()
			}, 100)
			gameOver = true
			break
		}
	}
}

const checkTie = () => {
	if (counter === 9 && !gameOver) {
		setTimeout(() => {
			alert('Ничья!')
			resetGame()
		}, 100)
		gameOver = true
	}
}

const resetGame = () => {
	board__item.forEach(item => {
		item.classList.remove('player__first', 'player__second')
		item.innerHTML = ''
	})

	counter = 0
	gameOver = false
	currentPlayer = 'player__first'
}

const makeBotMove = () => {
	if (gameOver) return

	if (currentPlayer === 'player__first') return

	let bestScore = -Infinity
	let bestMove

	// Здесь создается копия текущего состояния доски
	let boardCopy = Array.from(board__item)

	for (let i = 0; i < boardCopy.length; i++) {
		if (
			!boardCopy[i].classList.contains('player__first') &&
			!boardCopy[i].classList.contains('player__second')
		) {
			boardCopy[i].classList.add('player__second')
			let score = minimax(boardCopy, 0, false)
			boardCopy[i].classList.remove('player__second')

			if (score > bestScore) {
				bestScore = score
				bestMove = i
			}
		}
	}

	board__item[bestMove].classList.add('player__second')
	board__item[bestMove].innerHTML = `<img src='..//img/player__second.png'>`

	counter++
	checkWin()
	togglePlayer()
	checkTie()
}

const minimax = (board, depth, isMaximizing) => {
	if (checkWinner(board, 'player__first')) {
		return -1
	} else if (checkWinner(board, 'player__second')) {
		return 1
	} else if (isBoardFull(board)) {
		return 0
	}

	if (isMaximizing) {
		let bestScore = -Infinity
		for (let i = 0; i < board.length; i++) {
			if (
				!board[i].classList.contains('player__first') &&
				!board[i].classList.contains('player__second')
			) {
				board[i].classList.add('player__second')
				let score = minimax(board, depth + 1, false)
				board[i].classList.remove('player__second')
				bestScore = Math.max(score, bestScore)
			}
		}
		return bestScore
	} else {
		let bestScore = Infinity
		for (let i = 0; i < board.length; i++) {
			if (
				!board[i].classList.contains('player__first') &&
				!board[i].classList.contains('player__second')
			) {
				board[i].classList.add('player__first')
				let score = minimax(board, depth + 1, true)
				board[i].classList.remove('player__first')
				bestScore = Math.min(score, bestScore)
			}
		}
		return bestScore
	}
}

const checkWinner = (board, player) => {
	for (const combo of winCombinations) {
		const [a, b, c] = combo
		if (
			board[a].classList.contains(player) &&
			board[b].classList.contains(player) &&
			board[c].classList.contains(player)
		) {
			return true
		}
	}
	return false
}

const isBoardFull = board => {
	return board.every(
		cell =>
			cell.classList.contains('player__first') ||
			cell.classList.contains('player__second')
	)
}

board__item.forEach(item => {
	item.addEventListener('click', () => {
		if (
			!item.classList.contains('player__first') &&
			!item.classList.contains('player__second') &&
			!gameOver
		) {
			item.classList.add(currentPlayer)
			item.innerHTML = `<img src='${
				currentPlayer === 'player__first'
					? '..//img/player__first.png'
					: '..//img/player__second.png'
			}'>`

			counter++
			checkWin()
			togglePlayer()
			checkTie()

			setTimeout(() => {
				makeBotMove()
			}, 200)
		}
	})
})

document.querySelector('.action a').addEventListener('click', () => {
	resetGame()
})

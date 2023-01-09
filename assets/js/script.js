let origBoard;
const huPlayerSymbol = 'O';
const aiPlayerSymbol = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

/**
 * this function give an empty game table where the
 * user(huPlayerSymbol) must to make the first move 
 * so the game can start.
 * the startGame is also the replay bottom to restart the game.
 */
function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].classList.remove("hu");
		cells[i].addEventListener('click', turnClick, false);
	}
}

/**
 * The turnClick is the function that define the square 
 * with the O or X's 
 * 
 * @param {*} square 
 */
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		const gameOver = turn(square.target.id, huPlayerSymbol);
		if (gameOver) return;
		setTimeout(() => {
			turn(bestSpot(), aiPlayerSymbol);
		}, 850);
	}
}

/**
 * the turn is divided into two parameters 
 * one for the huPlayerSymbol and the aiPlayerSymbol
 * and decide what player has won
 * @param {} squareId 
 * @param {*} playerSymbol 
 */
function turn(squareId, playerSymbol) {
	origBoard[squareId] = playerSymbol;
	document.getElementById(squareId).innerText = playerSymbol;
	document.getElementById(squareId).classList.add("huplayer");

	const gameTied = checkTie();
	const playerWon = checkWin(origBoard, playerSymbol);
	if (playerWon) {
		gameOver(playerWon);
	}

	return !!(gameTied || playerWon);
}

/**
 * we are using a reduce definde all the move that has been played throughout the game
 * a = accumulater is the value that is the end result of the board
 * e = the element the board and the i is the index
 * @param {*} board I used this because during the game the value can change
 * and the board might change.
 * @param {*} player is the values that can be used during the game.
 * @returns 
 */
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;

	/**
	 * here the let function define the winner
	 */
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}

/**
 * This function check if the game is won or lost 
 * choosing 2 different background one is for the win of the user 
 * the other is for thw win of the ia 
 * @param {boolean} gameWon 
 */
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayerSymbol ? "pink" : "rgba(95, 104, 191, 0.56";
	}
	/**
	 * here we define that the user can not click 
	 * on the square once the game is finish.
	 */
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayerSymbol ? "Congrats!" : "😎");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

/**
 * The bestSpot function define the empty square
 * where the aiPlayerSymbol insert the Xs
 * @returns 
 */
function bestSpot() {
	return minimax(origBoard, aiPlayerSymbol).index;
}

/**
 * This function check if the end result is a tie.
 * @returns {boolean} Whether game is a tie
 */
function checkTie() {
	if (emptySquares().length == 0) {
		for (let i = 0; i < cells.length; i++) {
			cells[i].classList.add("hu");
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!");
		return true;
	}
	return false;
}


/**
 * A minimax algorithm is a recursive program written to find the 
 * best gameplay that minimizes any tendency to lose a game 
 * while maximizing any opportunity to win the game
 * Tic Tac Toe: Understanding the Minimax Algorithm. 
 * https://github.com/beaucarnes/fcc-pro...
 * @param {*} newBoard 
 * @param {*} playerSymbol 
 * @returns 
 */
function minimax(newBoard, playerSymbol) {
	let availSpots = emptySquares();

	if (checkWin(newBoard, huPlayerSymbol)) {
		return { score: -10 };
	} else if (checkWin(newBoard, aiPlayerSymbol)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}
	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = playerSymbol;

		if (playerSymbol == aiPlayerSymbol) {
			let result = minimax(newBoard, huPlayerSymbol);
			move.score = result.score;
		} else {
			let result = minimax(newBoard, aiPlayerSymbol);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if (playerSymbol === aiPlayerSymbol) {
		let bestScore = -10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
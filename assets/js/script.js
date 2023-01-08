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

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}


function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayerSymbol);{
			setTimeout(() => {
			turn(bestSpot(), aiPlayerSymbol);}, 850);
	}
}
}

function turn(squareId, playerSymbol) {
	origBoard[squareId] = playerSymbol;
	document.getElementById(squareId).innerText = playerSymbol;
	document.getElementById(squareId).classList.add("huplayer");
	let gameWon = checkWin(origBoard, playerSymbol);
	if (gameWon) {
		gameOver(gameWon);
     }
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
		gameWon.player == huPlayerSymbol ? "userWon" : "rgba(95, 104, 191, 0.56";
	}
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

function bestSpot() {
	return minimax(origBoard, aiPlayerSymbol).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "rgb(255, 127, 80)";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!");
		return true;
	}
	return false;
}

function minimax(newBoard, playerSymbol) {
	let availSpots = emptySquares();

	if (checkWin(newBoard, huPlayerSymbol)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayerSymbol)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
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
	if(playerSymbol === aiPlayerSymbol) {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
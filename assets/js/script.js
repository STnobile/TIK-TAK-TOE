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

let userScore = 0;
let computerScore = 0;
let tieScore = 0;

const MAX_GAMES = 5;
let gamesCount = 0;

// Time in milliseconds before AI makes a move.
const AI_TURN_DELAY = 850;

// Will stop the user to extra moves.
const cells = document.querySelectorAll('.cell');
let moveInProgress = false;


const resetGame = () => {
	userScore = 0;
	computerScore = 0;
	tieScore = 0;
	gamesCount = 0;
	document.querySelector(".final-result").display = "none";
};

//
// this function give an empty game table where the
// user(huPlayerSymbol) must to make the first move 
// so the game can start.
// the startGame is also the replay bottom to restart the game.
//
function startGame() {
	document.getElementById("userScore").innerText = userScore;
	document.getElementById("tieScore").innerText = tieScore;
	document.getElementById("computerScore").innerText = computerScore;
	document.querySelector(".endgame").style.display = "none";
	
	if (MAX_GAMES === gamesCount) {
		alert("You have played " + gamesCount + ", That enough");
	} else {
		origBoard = Array.from(Array(9).keys());
		moveInProgress = false;
		
		for (let i = 0; i < cells.length; i++) {
			cells[i].innerText = '';
			cells[i].style.removeProperty('background-color');
			cells[i].classList.remove("hu");
			cells[i].addEventListener('click', turnClick, false);
		}

		gamesCount = gamesCount + 1;
	}
}


//
// The turnClick is the function that define the square 
// with the O or X's 

function turnClick(square) {
	if (moveInProgress) return;

	if (typeof origBoard[square.target.id] == 'number'){
		moveInProgress = true;
		const gameOver = turn(square.target.id, huPlayerSymbol);
		if (gameOver) return;
		
		setTimeout(() => {
			turn(bestSpot(), aiPlayerSymbol);
			moveInProgress = false;
		}, AI_TURN_DELAY);
	}
}


// the turn is divided into two parameters 
// one for the huPlayerSymbol and the aiPlayerSymbol
// and decide what player has won
// @param {} squareId 
// @param {*} playerSymbol 


function turn(squareId, playerSymbol) {
    origBoard[squareId] = playerSymbol;
	document.getElementById(squareId).innerText = playerSymbol;
	document.getElementById(squareId).classList.add("hu_player");

	const gameTied = checkTie();
	const playerWon = checkWin(origBoard, playerSymbol);

	if (playerWon == huPlayerSymbol) {
     userScore = userScore + 1;
	 gameOver(playerWon);
    }
	if (playerWon) {
		computerScore = computerScore + 1;
		gameOver(playerWon);
	}
    if (gameTied) {
		tieScore = tieScore + 1;
	}
	return !!(gameTied || playerWon);
}

 //
 // we are using a reduce defined all the move that has been played throughout the game
 // a = accumulates is the value that is the end result of the board
 // e = the element the board and the i is the index
 // @param {//} board I used this because during the game the value can change
 // and the board might change.
 // @param {//} player is the values that can be used during the game.
 // @returns 
 
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;

	//here the let function define the winner
	
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}


 // This function check if the game is won or lost 
 // choosing 2 different background one is for the win of the user 
 // the other is for thw win of the ia 
 // @param {boolean} gameWon 
 
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayerSymbol ? "pink" : "rgba(95, 104, 191, 0.56";
	}
	
	// Here we define that the user can not click 
	// on the square once the game is finish.
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayerSymbol ? "Congrats!" : "😎");
}

// this function declare the result of the game, user win, game tie, AI win.
function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;

	if (MAX_GAMES === gamesCount) {
		const playerWon = userScore > computerScore;
		const computerWon = computerScore > userScore;
		let gameResult = "It's a tie";
		if (playerWon) {
			gameResult = "You won!";
		} else if (computerWon) {
			gameResult = "AI won!";
		}

		const finalResultElement = document.querySelector(".final-result");
		finalResultElement.style.display = "block";
		finalResultElement.innerText = gameResult;
	}
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}


// The bestSpot function define the empty square
// where the aiPlayerSymbol insert the Xs
// @returns 

function bestSpot() {
	return minimax(origBoard, aiPlayerSymbol).index;
}



 //
 // This function check if the end result is a tie.
 // @returns {boolean} Whether game is a tie
 //
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


//
// A minimax algorithm is a recursive program written to find the 
// best game play that minimizes any tendency to lose a game 
// while maximizing any opportunity to win the game
// Tic Tac Toe: Understanding the Minimax Algorithm. 
// https://github.com/beaucarnes/fcc-pro...
// newBoard 
// playerSymbol 
// @returns 

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


document.addEventListener("DOMContentLoaded", () => {
	const nextBtn = document.getElementById("nextBtn");
	const replayBtn = document.getElementById("replayBtn");

	nextBtn.addEventListener("click", startGame);
	replayBtn.addEventListener("click", () => {
	  	resetGame();
		startGame();
	});
	
	startGame();
});

var origBoard;
const huPlayer = "0";
const aiPlayer = "X";
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").getElementsByClassName.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i; i < cells.length; i++) {
        cells[i].innerText ="";
        cells[i].style.removeProperty('background-color');
        cells[1].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    console.log(square.target.id)
}
// page's elements
const currentPlayerInput = document.getElementById('currentPlayer');
const boardFields = document.querySelectorAll('.board__field');
const root = document.querySelector(':root');

// virtual elements and players
let virtualBoard = [];

const playerX = {
    name: "",
    tag: "X"
};

const playerO = {
    name: "",
    tag: "O"
};

let currentPlayer = '';

// the function is designed to collect the players names, initialize, and then execute a second function.
function startGame() {
    playerX.name = document.getElementById('playerX').value;
    playerO.name = document.getElementById('playerO').value;

    if (!playerX.name || !playerO.name) {
        alert("Please provide the name of both players.");
        return;
    } else {
        initializeGame();
        document.getElementById('startGame').disabled = true;
    }
};

function initializeGame() {
    currentPlayer = playerX;
    currentPlayerInput.value = currentPlayer.name;

    boardFields.forEach(field => {
        field.classList.remove('disabledField');
        field.addEventListener('click', () => toPlay(field, currentPlayer));
    })

    virtualBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
};

function changePlayer() {
    currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
    currentPlayerInput.value = currentPlayer.name;
};

function toPlay(field, currentPlayer) {
    if (virtualBoard[field.dataset.row][field.dataset.column] === '') {
        virtualBoard[field.dataset.row][field.dataset.column] = currentPlayer
        field.textContent = currentPlayer.tag
        changePlayer();
    }

    const win = winCase();
    const draw = drawCase();

    if (win) {
        document.querySelector('.current__player__label').textContent = 'Winner!'
        currentPlayerInput.value = win.name
        boardFields.forEach(field => {
            field.classList.add('disabledField');
        })
        currentPlayerInput.classList.add('noInput');
        return;
    } else if (draw) {
        document.querySelector('.current__player__label').textContent = 'Game drawn!';
        currentPlayerInput.value = 'Try Again!';
        currentPlayerInput.classList.add('noInput');
    } else {
        changePlayer();
    }
};

function winCase() {
    // Verify rows and columns
    for (let i = 0; i < 3; i++) {
        if (
            (virtualBoard[i][0] === virtualBoard[i][1] && virtualBoard[i][1] === virtualBoard[i][2] && virtualBoard[i][0] !== '') ||
            (virtualBoard[0][i] === virtualBoard[1][i] && virtualBoard[1][i] === virtualBoard[2][i] && virtualBoard[0][i] !== '')
        ) {
            return virtualBoard[i][i]
        } else {
            changePlayer();
        }
    }
    // Verify diagonals
    if (
        (virtualBoard[0][0] === virtualBoard[1][1] && virtualBoard[1][1] === virtualBoard[2][2] && virtualBoard[0][0] !== '') ||
        (virtualBoard[0][2] === virtualBoard[1][1] && virtualBoard[1][1] === virtualBoard[2][0] && virtualBoard[0][2] !== '')
    ) {
        return virtualBoard[1][1]
    } else {
        return null; // No winner
    }
}

function drawCase() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (virtualBoard[i][j] === '') {
                return false; // There are still empty spaces, the game's not over.
            }
        }
    }
    return true; // All the spaces are filled, it's a draw.
}

function resetGame() {
    currentPlayer = '';

    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
    document.getElementById('startGame').disabled = false
    document.getElementById('currentPlayer').value = '';
    document.querySelector('.current__player__label').textContent = 'Current Player'
    currentPlayerInput.classList.remove('noInput');

    boardFields.forEach(field => {
        field.textContent = '';
        field.classList.add('disabledField');
    });
};

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('resetGame').addEventListener('click', resetGame);
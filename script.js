var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}

let GetPuzzle = document.getElementById("GetPuzzle");
let SolvePuzzle = document.getElementById("SolvePuzzle");

GetPuzzle.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response);
    board = response.newboard.grids[0].value;
    console.log(board);
    FillBoard(board);
  };
  xhrRequest.open("get", "https://sudoku-api.vercel.app/api/dosuku");
  //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
  xhrRequest.send();
};

SolvePuzzle.onclick = () => {
  SudokuSolver(board, 0, 0, 9);
};

function isValid(board, i, j, num, n) {
  for (let x = 0; x < n; x++) {
    if (board[i][x] == num || board[x][j] == num) return false;
  }

  let nr = Math.sqrt(n);
  let ni = i - (i % nr);
  let nj = j - (j % nr);

  for (let x = ni; x < ni + nr; x++) {
    for (let y = nj; y < nj + nr; y++) {
      if (board[x][y] == num) return false;
    }
  }
  return true;
}

function SudokuSolver(board, i, j, n) {
  if (i == n) {
    FillBoard(board);
    return true;
  }

  if (j == n) {
    return SudokuSolver(board, i + 1, 0, n);
  }

  if (board[i][j] != 0) {
    return SudokuSolver(board, i, j + 1, n);
  }

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, i, j, num, n)) {
      board[i][j] = num;
      let subAns = SudokuSolver(board, i, j + 1, n);
      if (subAns) return true;
      board[i][j] = 0;
    }
  }
  return false;
}

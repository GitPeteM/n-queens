/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//n = 4 =>4x4
window.findNRooksSolution = function(n) {
  // console.log('n', n);
  let solution = new Board({n: n}); //fixme
  let pieceCount = 0;
  for (let rowIndex = 0; rowIndex <= n; rowIndex++) {
    if (pieceCount === n) {
      // console.log(solution.rows());
      return solution.rows();
    }
    for (let colIndex = 0; colIndex < n; colIndex++) {
      solution.togglePiece(rowIndex, colIndex);
      // console.log('solutionPostToggle', solution.rows());
      pieceCount++;
      if (solution.hasRowConflictAt(rowIndex) || solution.hasColConflictAt(colIndex)) {
        solution.togglePiece(rowIndex, colIndex);
        pieceCount--;
        continue;
      }
      break;
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 0;
  }

  let solutionCount = 0;

  let possibleBoard = (function() {

    // let possibleBoard = new Array(n).fill(row);
    // let board = []; // yup this one
    debugger;
    let row = new Array(n).fill(0);
    let board = new Array(n).fill(row);
    for (let i = 0; i < n; i++) {
      board[i][i] = 1;
    }
    return board;
  })();

  let findCombination = (board = []) => {
    if (board.length === n) {
      solutionCount++;
      return;
    }

    possibleBoard.forEach(row => {
      if (board.length && rookHasConflict([...board, row])) {
        return;
      }
      board.push(row);
      findCombination(board);
    });
  };

  let rookHasConflict = function(board) {
    // debugger;
    let numOfRowsToFill = n - board.length;
    let row = new Array(n).fill(0);
    let testBoardRows = numOfRowsToFill === 0 ? board : [...board, ...new Array(numOfRowsToFill).fill(row)];
    let boardObj = new Board(testBoardRows);
    return boardObj.hasAnyRowConflicts() || boardObj.hasAnyColConflicts(); // for n-queen, just add diagonal test case.
  };

  findCombination();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

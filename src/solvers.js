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

  let possibleBoard = function() {
    let tempBoard = [];
    // debugger;
    for (let i = 0; i < n; i++) {
      let row = new Array(n).fill(0);
      row[i] = 1;
      tempBoard.push(row);
    }
    return tempBoard;
  };


  let findCombination = (board = []) => {
    // console.log(board.length);

    if (board.length === n && !rookHasConflict(board)) {
      console.log('rookHasConflict - base case', rookHasConflict(board));
      solutionCount++;
      console.log('solutionCount: ', solutionCount);
      // console.log("board: ", board);
      return;
    }
    if (rookHasConflict(board)) {
      // console.log('rookHasConflict - true?', rookHasConflict(board));
      return;
    }

    let testBoard = possibleBoard();
    testBoard.forEach(row => {
      // board.push(row);
      // console.log("test: ", [...board, row]);
      findCombination([...board, row]);
    });

  };

  let rookHasConflict = function(board) {


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
      if (solution.hasRowConflictAt(rowIndex) || solution.hasColConflictAt(colIndex) || solution.hasMajorDiagonalConflictAt(colIndex) || solution.hasMinorDiagonalConflictAt(colIndex)) {
        solution.togglePiece(rowIndex, colIndex);
        pieceCount--;
        continue;
      }
      break;
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 0;
  }

  let solutionCount = 0;

  let possibleBoard = function() {
    let tempBoard = [];
    // debugger;
    for (let i = 0; i < n; i++) {
      let row = new Array(n).fill(0);
      row[i] = 1;
      tempBoard.push(row);
    }
    return tempBoard;
  };


  let findCombination = (board = []) => {
    // console.log(board.length);

    if (board.length === n && !rookHasConflict(board)) {
      console.log('rookHasConflict - base case', rookHasConflict(board));
      solutionCount++;
      console.log('solutionCount: ', solutionCount);
      // console.log("board: ", board);
      return;
    }
    if (rookHasConflict(board)) {
      // console.log('rookHasConflict - true?', rookHasConflict(board));
      return;
    }


    let testBoard = possibleBoard();
    testBoard.forEach(row => {
      // board.push(row);
      // console.log("test: ", [...board, row]);
      findCombination([...board, row]);
    });

  };

  let rookHasConflict = function(board) {

    let numOfRowsToFill = n - board.length;
    let row = new Array(n).fill(0);
    let testBoardRows = numOfRowsToFill === 0 ? board : [...board, ...new Array(numOfRowsToFill).fill(row)];
    let boardObj = new Board(testBoardRows);
    return boardObj.hasAnyRowConflicts() || boardObj.hasAnyColConflicts() || boardObj.hasAnyMajorDiagonalConflicts() || boardObj.hasAnyMinorDiagonalConflicts(); // for n-queen, just add diagonal test case.
  };

  findCombination();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

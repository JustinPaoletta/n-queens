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



window.findNRooksSolution = function(n) {
  let board = new Board({'n': n});
  // iterate through rows
  for (let r = 0; r < n; r++ ) {
    // iterate columns
    for (let c = 0; c < n; c++ ) {
      // tries to place a rook
      board.togglePiece(r, c);
      // increments count to try to get to n rooks
      // are there now conflicts on the board?
      if (board.hasAnyRooksConflicts()) {
        // remove it if so
        board.togglePiece(r, c);
        // decrements the count, take that rook away
      }
    }
  }
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = function(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * solutionCount(n - 1);
    }
  };

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount(n));
  return solutionCount(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  let board;
  let rowStart = -1;
  let colStart = -1;
  let count = 0;

  do {
    rowStart++;
    colStart = -1;
    do {
      colStart++;
      count = 0;
      board = new Board ({'n': n});
      for (let y = 0 + rowStart; y < n + rowStart; y++) {
        let r = (y >= n) ? y - n : y;
        for (let x = 0 + colStart; x < n + colStart; x++) {
          let c = (x >= n) ? x - n : x;
          board.togglePiece(r, c);
          count++;
          if (board.hasAnyQueenConflictsOn(r, c)) {
            board.togglePiece(r, c);
            count--;
          }
        }
      }
    } while (colStart < n && count < n);
  } while (rowStart < n && count < n);
  var solution = (count < n) ? new Board({'n': n}).rows() : board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

  // let board;
  // let count = 0;
  // let colStart = -1;
  // let rowStart = -1;


  // while (colStart < n) {
  //   colStart++;
  //   rowStart++;
  //   board = new Board({'n': n});
  //   // iterate through rows
  //   for (let r = rowStart; r < n; r++ ) {
  //     // iterate columns
  //     for (let c = colStart; c < n; c++ ) {
  //       // tries to place a queen
  //       board.togglePiece(r, c);
  //       if (!board.hasAnyQueensConflicts()) {
  //         count++;
  //       }
  //       // are there now conflicts on the board?
  //       if (board.hasAnyQueenConflictsOn(r, c)) {
  //         // remove it if so
  //         board.togglePiece(r, c);
  //         // decrements the count, take that queen away
  //         console.log(count);
  //         count --;
  //         console.log(count);
  //       }

  //       if (count === n) {
  //         console.log('BooYah!');
  //         var solution = board.rows();
  //         console.log('Single solution for ' + n + ' queens:', JSON.stringify(count));
  //         return solution;
  //       }

  //     }
  //   }
  // }


  // var solution = board.rows();
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(count));
  // return solution;


};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var rangeOfQueens = [];


  var incrementRow = function(row) {
    var continueIncrement = true;
    if (rangeOfQueens[row] < n - 1) {
      rangeOfQueens[row]++;
    } else {
      if (row < n - 1) {
        rangeOfQueens[row] = 0;
        continueIncrement = incrementRow(row + 1);
      } else {
        return false;
      }
    }
    return continueIncrement;
  };


  // create a array with indexes of 0 - (n - 1) and set all values equal to 0
  _.range(0, n).forEach((index) => rangeOfQueens[index] = 0);
  // rowColumn[0] = 0; // row = 0, column = 0  board.togglePiece(0,0) = 1 (Queen)
  // rowColumn[1] = 0; (1,0)
  // rowColumn[2] = 0; (2,0)
  // rowColumn[3] = 0; (3,0)
  // rowColumn[4] = 0; (4,0)


  do {

    //creates new board
    board = new Board ({'n': n});
    // toggles queens on initially all in first col
    rangeOfQueens.forEach((c, r) => board.togglePiece(r, c));

    // if no conflicts on board increase solution count
    if (!board.hasAnyQueensConflicts()) {
      solutionCount++;
    }
  } while (incrementRow(0));
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};

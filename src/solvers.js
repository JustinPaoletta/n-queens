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
  let board = new Board({'n': n});
  let count = 0;
  let tracker = 0;

  // iterate through rows
  for (let r = 0; r < n; r++ ) {
    // iterate columns
    for (let c = 0; c < n; c++ ) {
      // tries to place a queen
      board.togglePiece(r, c);
      // increments count to try to get to n queens
      count++;

      // are there now conflicts on the board?
      if (board.hasAnyQueensConflicts()) {

        // remove it if so
        board.togglePiece(r, c);
        // decrements the count, take that queen away
        count --;

        if (count === n - 1) {
          console.log('booyah!');
          tracker++;
        }
      }

    }
  }

  var solution = tracker;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  // let start = -1;
  // let count = 0;
  // let board;
  // // create boards until we find a solution
  // do {
  //   start++;
  //   count = 0;
  //   board = new Board({'n': n});
  //   // iterate through rows
  //   for (let i = start; i < n + start; i++ ) {
  //     let r = (i >= n) ? i - n : i;
  //     // iterate columns
  //     for (let c = 0; c < n; c++ ) {
  //       // tries to place a queen
  //       board.togglePiece(r, c);
  //       // increments count to try to get to n queens
  //       count++;
  //       // are there now conflicts on the board?
  //       if (board.hasAnyQueensConflicts()) {
  //         // remove it if so
  //         board.togglePiece(r, c);
  //         // decrements the count, take that queen away
  //         count--;
  //       }
  //     }
  //   }
  //   // did we place n queens?
  // } while (count !== n && start < n );
  // var solution = (start < n) ? board.rows() : 0;
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

(function () {
	if (typeof BTT === "undefined") {
		window.BTT = {};
	}

	var LittleBoard = BTT.LittleBoard = function () {
		this.grid = makeGrid();
		this.marks = ["x", "o"];
	};
	
	function makeGrid() {
	  var grid = [];

	  for (var i = 0; i < 3; i++) {
	    grid.push([]);
	    for (var j = 0; j < 3; j++) {
	      grid[i].push(null);
	    }
	  }

	  return grid;
	};
	

	LittleBoard.prototype.isValidPos = function (pos) {
	  return (
	    (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3)
	  );
	};


	LittleBoard.prototype.isEmptyPos = function (pos) {
	  if (!this.isValidPos(pos)) {
	    throw new MoveError("Is not valid position!");
	  }

	  return (this.grid[pos[0]][pos[1]] === null);
	};

	LittleBoard.prototype.isOver = function () {
	  if (this.winner() != null) {
	    return true;
	  }

	  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
	    for (var colIdx = 0; colIdx < 3; colIdx++) {
	      if (this.isEmptyPos([rowIdx, colIdx])) {
	        return false;
	      }
	    }
	  }

	  return true;
	};

	LittleBoard.prototype.placeMark = function (pos, mark) {
	  if (!this.isEmptyPos(pos)) {
	    throw new MoveError("Is not an empty position!");
	  }

	  this.grid[pos[0]][pos[1]] = mark;
	};


	LittleBoard.prototype.winner = function () {
	  var posSeqs = [
	    // horizontals
	    [[0, 0], [0, 1], [0, 2]],
	    [[1, 0], [1, 1], [1, 2]],
	    [[2, 0], [2, 1], [2, 2]],
	    // verticals
	    [[0, 0], [1, 0], [2, 0]],
	    [[0, 1], [1, 1], [2, 1]],
	    [[0, 2], [1, 2], [2, 2]],
	    // diagonals
	    [[0, 0], [1, 1], [2, 2]],
	    [[2, 0], [1, 1], [0, 2]]
	  ];

	  for (var i = 0; i < posSeqs.length; i++) {
	    var winner = this.winnerHelper(posSeqs[i]);
	    if (winner != null) {
	      return winner;
	    }
	  }

	  return null;
	};

	LittleBoard.prototype.winnerHelper = function (posSeq) {
	  for (var markIdx = 0; markIdx < this.marks.length; markIdx++) {
	    var targetMark = this.marks[markIdx];
	    var winner = true;
	    for (var posIdx = 0; posIdx < 3; posIdx++) {
	      var pos = posSeq[posIdx];
	      var mark = this.grid[pos[0]][pos[1]];

	      if (mark != targetMark) {
	        winner = false;
	      }
	    }

	    if (winner) {
	      return targetMark;
	    }
	  }

	  return null;
	};
	
	
	var Game = BTT.Game = function () {
		this.board = new BTT.LittleBoard();
		this.currentPlayer = "x";
	};

	Game.prototype.isOver = function () {
	  return this.board.isOver();
	};

	// Game.prototype.playMove = function (pos) {
	//   this.board.placeMark(pos, this.currentPlayer);
	//   this.swapTurn();
	// };
	
	Game.prototype.playMove = function (pos, player) {
	  this.board.placeMark(pos, player);
	};

	// Game.prototype.promptMove = function (reader, callback) {
	//   var game = this;
	//
	//   this.board.print();
	//   console.log("Current Turn: " + this.currentPlayer)
	//
	//   reader.question("Enter rowIdx: ", function (rowIdxStr) {
	//     var rowIdx = parseInt(rowIdxStr);
	//     reader.question("Enter colIdx: ", function (colIdxStr) {
	//       var colIdx = parseInt(colIdxStr);
	//       callback([rowIdx, colIdx]);
	//     });
	//   });
	// };

	// Game.prototype.run = function (reader, gameCompletionCallback) {
	//   this.promptMove(reader, (function (move) {
	//     try {
	//       this.playMove(move);
	//     } catch (e) {
	//       if (e instanceof MoveError) {
	//         console.log(e.msg);
	//       } else {
	//         throw e;
	//       }
	//     }
	//
	//     if (this.isOver()) {
	//       this.board.print();
	//       if (this.winner()) {
	//         console.log(this.winner() + " has won!");
	//       } else {
	//         console.log("NO ONE WINS!");
	//       }
	//       gameCompletionCallback();
	//     } else {
	//       // continue loop
	//       this.run(reader, gameCompletionCallback);
	//     }
	//   }).bind(this));
	// };

	Game.prototype.swapTurn = function () {
	  if (this.currentPlayer === this.board.marks[0]) {
	    this.currentPlayer = this.board.marks[1];
	  } else {
	    this.currentPlayer = this.board.marks[0];
	  }
	};

	Game.prototype.winner = function () {
	  return this.board.winner();
	};
	
})();
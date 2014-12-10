(function () {
	if (typeof BTT === "undefined") {
		window.BTT = {};
	}
	
	var Board = BTT.Board = function () {
		this.marks = ["x", "o"];
	};
	
	Board.prototype.isValidPos = function (pos) {
	  return (
	    (0 <= pos[0]) && (pos[0] < 3) && (0 <= pos[1]) && (pos[1] < 3)
	  );
	};
	
	Board.prototype.isOver = function () {
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
	
	Board.prototype.winnerHelper = function (posSeq) {
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
	
	Board.prototype.winner = function () {
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

	var LittleBoard = BTT.LittleBoard = function () {
		this.grid = makeGrid();
		this.marks = ["x", "o"];
	};
	
	LittleBoard.prototype = new Board();
	
	// can I add makeGrid to top level board class,
	// pass in 'new LittleBoard' when constructing
	// bigBoard grid?
	
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
	
	LittleBoard.prototype.isEmptyPos = function (pos) {
	  if (!this.isValidPos(pos)) {
	    throw new MoveError("Is not valid position!");
	  }

	  return (this.grid[pos[0]][pos[1]] === null);
	};

	LittleBoard.prototype.placeMark = function (pos, mark) {
	  if (!this.isEmptyPos(pos)) {
	    throw new MoveError("Is not an empty position!");
	  }

	  this.grid[pos[0]][pos[1]] = mark;
	};

	
	var LittleGame = BTT.LittleGame = function () {
		this.board = new BTT.LittleBoard();
		this.currentPlayer = "x";
	};

	LittleGame.prototype.isOver = function () {
	  return this.board.isOver();
	};

	LittleGame.prototype.playMove = function (pos, player) {
	  this.board.placeMark(pos, player);
	};

	LittleGame.prototype.swapTurn = function () {
	  if (this.currentPlayer === this.board.marks[0]) {
	    this.currentPlayer = this.board.marks[1];
	  } else {
	    this.currentPlayer = this.board.marks[0];
	  }
	};

	LittleGame.prototype.winner = function () {
	  return this.board.winner();
	};
	
	
	
	
	var BigGame = BTT.BigGame = function () {
		this.board = makeBoardGrid();
		this.currentPlayer = "x";
	};
	
	
	
	function makeBoardGrid() {
		var grid = [];
		
		for (var i = 0; i < 3; i++) {
			grid.push([]);
			for (var j = 0; j < 3; j++) {

				grid[i].push(new BTT.LittleGame());
			}
		}
		return grid;
	};
	
})();
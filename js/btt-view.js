(function () {
	if (typeof BTT === "undefined") {
		window.BTT = {};
	}
	
	var View = BTT.View = function ($boardEl) {
		this.$boardEl = $boardEl;
		this.game = new BTT.BigGame();

		this.setupBoards();
		this.bindEvents();
	};
	
	// function makeBoardGrid() {
	// 	var grid = [];
	//
	// 	for (var i = 0; i < 3; i++) {
	// 		grid.push([]);
	// 		for (var j = 0; j < 3; j++) {
	//
	// 			grid[i].push(new BTT.LittleGame());
	// 		}
	// 	}
	// 	return grid;
	// };
	
	View.prototype.bindEvents = function () {
		var view = this;
		
		this.$boardEl.on("click", "div.outer-cell", function (event){
			var $littleSquare = $(event.target);
			var $bigSquare = $(event.currentTarget);

			view.makeMove($littleSquare, $bigSquare);			
		});
	};
	
  View.prototype.makeMove = function ($littleSquare, $bigSquare) {
		var innerPos = $littleSquare.data("inner-pos");
		var outerPos = $bigSquare.data("outer-pos");
		
		var littleGame = this.game.board.grid[outerPos[0]][outerPos[1]];

		// eventually handle more conditions
		// probably with helper function from BigBoard class
		
		if (littleGame.board.isEmptyPos(innerPos)) {
			this.game.playMove(innerPos, outerPos, littleGame);
			$littleSquare.addClass(this.game.currentPlayer);
			$littleSquare.text(this.game.currentPlayer);
			
			this.game.swapTurn();
		} else {
			alert("square is already occupied");
		}

		if (littleGame.isOver() && littleGame.winner() != null) {
			$bigSquare.text(littleGame.winner().toUpperCase());
		}
		
		// if (game.board.isEmptyPos(innerPos)) {
		// 	game.playMove(innerPos, this.currentPlayer);
		//
		// 	$littleSquare.addClass(this.currentPlayer);
		// 	$littleSquare.text(this.currentPlayer);
		// 	this.swapTurn();
		//
		// } else {
		// 	alert("square is already occupied");
		// }
		
		// if (game.isOver()) {
		// 	// this.$boardEl.off("click");
		// 	// turn off only this specific board
		//
		// 	var winner = game.winner();
		// 	$bigSquare.text(winner.toUpperCase());
		//
		// 	// if (winner) {
		// 	// 	$(".win-msg").append(winner + " wins");
		// 	// } else {
		// 	// 	$(".win-msg").append("draw");
		// 	// }
		// }
		
		if (this.game.isOver()) {
			alert(this.game.winner() + " wins!");
		}
  };
	
	
	View.prototype.setupBoards = function () {
		this.setupBigBoard();
		var $bigBoard = $(".outer-cell");

		for (var k = 0; k < 9; k++) {
			for (var i = 0; i < 3; i++) {			
				var $row = $("<div class='inner-row'>");
			
				for (var j = 0; j < 3; j++) {
					var $cell = $("<div class='inner-cell'>");
					$cell.data("inner-pos", [i, j]);
				
					$row.append($cell);
				}
				$($bigBoard[k]).append($row);
			}
		}
	};
	
	// View.prototype.swapTurn = function () {
	//   if (this.currentPlayer === "x") {
	//     this.currentPlayer = "o";
	//   } else {
	//     this.currentPlayer = "x";
	//   }
	// };
	

	View.prototype.setupBigBoard = function (){
		for (var i = 0; i < 3; i++) {
			var $row = $('<div class="outer-row"></div>');

			for (var j = 0; j < 3; j++) {
				var $cell = $('<div class="outer-cell">');
				$cell.data("outer-pos", [i, j]);
				
				$row.append($cell);	
			}
			this.$boardEl.find($(".board")).append($row);
		}

	};
	
})();
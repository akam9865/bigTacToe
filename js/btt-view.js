(function () {
	if (typeof BTT === "undefined") {
		window.BTT = {};
	}
	
	var View = BTT.View = function ($boardEl) {
		this.$boardEl = $boardEl;
		this.game = makeBoardGrid();

		this.setupBoards();
		this.bindEvents();
	};
	
	function makeBoardGrid() {
		var grid = [];
		
		for (var i = 0; i < 3; i++) {
			grid.push([]);
			for (var j = 0; j < 3; j++) {

				grid[i].push(new BTT.Game());
			}
		}
		return grid;
	};
	
	View.prototype.bindEvents = function () {
		var view = this;
		this.$boardEl.on("click", "div.outer-cell", function (event){
			var $littleSquare = $(event.target);
			var $bigSquare = $(event.currentTarget);

			view.makeMove($littleSquare, $bigSquare);
			
		}).bind(this);
	};
	
  View.prototype.makeMove = function ($littleSquare, $bigSquare) {
		var innerPos = $littleSquare.data("inner-pos");
		var outerPos = $bigSquare.data("outer-pos");
		var game = this.game[outerPos[0]][outerPos[1]];

		var currentPlayer = game.currentPlayer;
		
		if (game.board.isEmptyPos(innerPos)) {
			game.playMove(innerPos);
			$littleSquare.addClass(currentPlayer);
			$littleSquare.text(currentPlayer);

		} else {
			alert("square is already occupied");
		}
		
		if (game.isOver()) {
			// this.$boardEl.off("click");
			// turn off only this specific board
			
			var winner = game.winner();
			$bigSquare.text(winner);
			
			// if (winner) {
			// 	$(".win-msg").append(winner + " wins");
			// } else {
			// 	$(".win-msg").append("draw");
			// }
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
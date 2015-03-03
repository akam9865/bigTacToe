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
	
	View.prototype.bindEvents = function () {
		var view = this;
		
		this.$boardEl.on("click", "div.outer-cell.active", function (event){
			var $littleSquare = $(event.target);
			var $bigSquare = $(event.currentTarget);
			
			view.makeMove($littleSquare, $bigSquare);			
			view.assignActive($littleSquare);
		});
	};
	
	View.prototype.assignActive = function ($littleSquare) {
		var innerPos = $littleSquare.data("innerPos");

		if (!innerPos || !this.game.board.grid[innerPos[0]][innerPos[1]].isOver) {
			$('.outer-cell').addClass('active');
		} else {
			var $nextActive = $($($('.outer-row')[innerPos[0]]).children()[innerPos[1]]);
			$('.outer-cell').removeClass('active');
			$nextActive.addClass('active');
		}
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
		
		if (this.game.isOver()) {
			$(".message").text(this.game.winner() + " wins!");
			$(".restart").addClass("gameover");
			$(".outer-cell").addClass('active');
			this.$boardEl.off();
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
				var $cell = $('<div class="outer-cell active">');
				$cell.data("outer-pos", [i, j]);
				$row.append($cell);	
			}
			
			this.$boardEl.find($(".board")).append($row);
		}
	};
})();
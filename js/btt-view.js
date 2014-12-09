(function () {
	if (typeof BTT === "undefined") {
		window.BTT = {};
	}
	
	var View = BTT.View = function ($boardEl) {
		this.$boardEl = $boardEl;
		
		this.setupBoards();
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
var Game_over = {
	
	preload: function(){

		// load the image for game screen
		game.load.image('gameover', './assets/images/gameover.png');
	},

	create: function(){

		// Create start button
		this.add.button(0, 0, 'gameover', this.startGame, this);

		// add previous game score
		game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        game.add.text(435, 346, "Click To Start Again", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});

	},

	startGame: function(){

		// Restart the game state
		this.state.start('Game');
	}
}
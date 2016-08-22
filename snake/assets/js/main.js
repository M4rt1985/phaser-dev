	// Create new instance of Phaser Game
	var game;

	game = new Phaser.Game(600, 450, Phaser.AUTO, '');

	// Bind Menu State to Menu variable
	game.state.add('Menu', Menu);

	// Bind Game state
	game.state.add('Game', Game);

	// Bind game over state
	game.state.add('Game_over', Game_over);

	// Set start state
	game.state.start('Menu');


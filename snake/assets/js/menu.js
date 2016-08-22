	var Menu = {

		preload: function(){
			// first paramater is how we refer to an image
			// second parameter is the path of image
			game.load.image('menu', './assets/images/menu.png')

		},

		create: function(){
			// add logo sprite to the game
			// Params: X, Y, Image reference
			this.add.button(0, 0, 'menu', this.startGame, this);

		},

		startGame: function(){
			// Change to Game state
			this.state.start('Game');
		}

	};
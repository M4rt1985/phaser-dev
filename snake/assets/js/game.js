	var snake, 
		apple, 
		squareSize, 
		score, 
		speed, 
		updateDelay, 
		direction, 
		new_direction, 
		addNew, 
		cursors, 
		scoreTextValue, 
		speedTextValue, 
		textStyle_Key, 
		textStyle_Value;

	var Game = {

		preload: function(){

			// Load resources for game
			game.load.image('snake', './assets/images/snake.png');
        	game.load.image('apple', './assets/images/apple.png');

		},

		create: function(){

			// setup global variables
			snake = [];
			apple = {};
			squareSize = 15;
			score = 0;
			speed = 0;
			updateDelay = 0;
			direction = 'right';
			new_direction = null;
			addNew = null;

			// set up the keyboard input
			cursors = game.input.keyboard.createCursorKeys();

			// initialise snake
			for(var i = 0; i < 10; i++){
				snake[i] = game.add.sprite( ( 150 + i * squareSize ), 150, 'snake');
			}

			// Initialise Apple
			this.generateApple();

			// Add Text to top of game.
	        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
	        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

	        // Score.
	        game.add.text(30, 20, "SCORE", textStyle_Key);
	        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
	        // Speed.
	        game.add.text(500, 20, "SPEED", textStyle_Key);
	        speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);

		},

		update: function(){

			// Handle arrow key presses
			if( cursors.right.isDown && direction != 'left' ){
				new_direction = 'right';
			}
			else if( cursors.left.isDown && direction != 'right' ){
				new_direction = 'left';
			}
			else if( cursors.up.isDown && direction != 'down' ){
				new_direction = 'up';
			}
			else if( cursors.down.isDown && direction != 'up' ){
				new_direction = 'down';
			}

			// game speed calculations
			// as score increases, so does the speed
			speed = Math.min(10, Math.floor(score/5));


			// slow down the update FPS
			updateDelay++;

			// make the snake move faster
			if( updateDelay % (10 - speed) == 0 ){

				var firstCell = snake[snake.length - 1],
					lastCell = snake.shift(),
					oldLastCellx = lastCell.x,
					oldLastCelly = lastCell.y;

				// change snakes direction
				if( new_direction ){

					direction = new_direction;
					new_direction = null;

				}

				if(direction == 'right'){

		            lastCell.x = firstCell.x + 15;
		            lastCell.y = firstCell.y;
		        }
		        else if(direction == 'left'){
		            lastCell.x = firstCell.x - 15;
		            lastCell.y = firstCell.y;
		        }
		        else if(direction == 'up'){
		            lastCell.x = firstCell.x;
		            lastCell.y = firstCell.y - 15;
		        }
		        else if(direction == 'down'){
		            lastCell.x = firstCell.x;
		            lastCell.y = firstCell.y + 15;
		        }

		        snake.push(lastCell);
		        firstCell = lastCell;

		        // increase length of snake if an apple is eaten
		        // add another block to the snake

		        if(addNew){
		        	snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'))
		        	addNew = false;
		        }

		        // check for apple collision
		        this.appleCollision();

		        // check if snake has collided with itself
		        this.selfCollision(firstCell);

		        // check if snake has collided with wall
		        this.wallCollision(firstCell);

			}



		},

		appleCollision: function(){

			//check that the snake overlaps the apple
			for(var i = 0; i < snake.length; i++){

				if(snake[i].x == apple.x && snake[i].y == apple.y ){

					// add length to snake
					addNew = true;

					// destroy old apple
					apple.destroy();

					// genrate new apple
					this.generateApple();

					// increase score
					score++;

					// update score text
					scoreTextValue.text = score.toString();

				}
			}

			

		},

		selfCollision: function(head){

			// check if the snakes head overlaps with itself
			for(var i = 0; i < snake.length - 1; i++){

				if( head.x == snake[i].x && head.y == snake[i].y ){

					// Send game over state
					game.state.start("Game_over");

				}
			}

			

		},

		wallCollision: function(head){

			// check to see if snake has hit the walls
			if( head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0 ){

					// Send game over state
					game.state.start("Game_over");

			}

			

		},

		generateApple: function(){

			// Y is between 0 and 585 (39*15)
			// X is between 0 and 435 (29*15)
			var randomX = Math.floor(Math.random() * 40) * squareSize,
			randomY = Math.floor(Math.random() * 30) * squareSize;

			// Add a new apple
			apple = game.add.sprite(randomX, randomY, 'apple');


		}


	};
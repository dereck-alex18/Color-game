var squares = document.querySelectorAll(".square");
var easy_bt = document.querySelector("#easy_btn");
var hard_bt = document.querySelector("#hard_btn");
var hard_bt = document.querySelector("#insane_btn");
var span_rgb = document.getElementById("span_color");
var span_result = document.querySelector("#result");
var h1 = document.querySelector("h1");
var bt = document.getElementById("reset");
var score = document.getElementById("score");
var colors = []; //This array will contain all the random colors
var pickedColor; //This variable will be the selected color, the one to be guessed
var quantity_of_squares = 6; //This variable will control the quantity of squares on the screen regarding the level
var attempts = 3;
var isEasy = false;

start_game(quantity_of_squares); //This funtion is to set up all the inicial features in the game. It will sort the colors and calls the function which will control all the events in the game

easy_btn.addEventListener("click", function(){
	easy_btn.classList.add("selected"); //Those classList will just set the backgrounds of the Easy and Hard buttons
	hard_btn.classList.remove("selected");
	insane_btn.classList.remove("selected");
	isEasy = true;
	quantity_of_squares = 3; //At easy level, there will be only 3 squares on the screen
	start_game(quantity_of_squares); // When the button square is pressed, the colors are random again, that's why start_game is called again	
	
});
hard_btn.addEventListener("click", function(){
	easy_btn.classList.remove("selected");
	hard_btn.classList.add("selected");
	insane_btn.classList.remove("selected");
	quantity_of_squares = 6; //At hard level, there will be 6 squares on the screen
	isEasy = false;
	start_game(quantity_of_squares);
});

insane_btn.addEventListener("click", function(){
	easy_btn.classList.remove("selected");
	hard_btn.classList.remove("selected");
	insane_btn.classList.add("selected");
	quantity_of_squares = 9; //At hard level, there will be 6 squares on the screen
	isEasy = false;
	start_game(quantity_of_squares);
});


bt.addEventListener("click", function(){
	start_game(quantity_of_squares); //Restart the game
});
function start_game(quantity){
	//Everytime the game is started this function is called
	colors = select_color_range(quantity); //This array contains all the random colors
	console.log(colors);
	pickedColor = colors[random_picked(quantity)]; //It's the chosen color to be guessed
	checkLevel();
	span_rgb.textContent = pickedColor; //Change the content of the span tag with the picked color
	h1.style.backgroundColor = "steelblue"; //Set the h1 background color to the standard color
	span_result.textContent = "Start";
	score.textContent = attempts; //The result of the game is set here. In the beginning it's setted to start
	bt.textContent = "New Colors"; //When the game is still in progress, this will be the text content of the reset button
	verify_game_conditions(); //Call verify_game_conditions function
}
function verify_game_conditions(){
	//This function set all the random colors to the squares background, verifies when a squares is clicked and also shows the user whether he or she has hit or missed the correct color
	for(var i = 0; i < squares.length; i++){
	// Adding the color to the squares
	if(colors[i]){
	//this if statement will just check if the variable quantity_of_squares is equal to 6, in other words, it cheks which level was chosen by the user
	squares[i].style.backgroundColor = colors[i];
	squares[i].style.display = "block"; //It will display ALL the squares on the screen
	}
	else{
		squares[i].style.display = "none"; // If the level chosen was the easy one, then only 3 squares will be displayed
	}		
	//Click listeners to the squares
	squares[i].addEventListener("click", isCorrect);
	}
}

function changeAllColors(color){
	//This function sets all the colors of the squares to the picked color
	plays = 0;
	h1.style.backgroundColor = color; //Changes the background color of the h1 element to the same color which was picked
	bt.textContent = "Play again?"; // Changes the text content of the reset button to Play again
	for (var i = 0; i < squares.length; i++) {
			squares[i].style.backgroundColor = pickedColor;
			
		}
}

function isCorrect(){
	var clickedColor = this.style.backgroundColor; // it grabs the colors of the clicked squares and compare them 
	
	if(clickedColor === pickedColor){
		//If the cklicked color is equal to the picked color, then the game will set all squares to the same color and the span tag changes to correct
		span_result.textContent = "Correct!";
		changeAllColors(clickedColor);
	}
	else{
		//Otherwise the user has to try again
		
		attempts--;
		console.log(attempts);
		score.textContent = attempts;
		this.style.backgroundColor = "#232323";
		span_result.textContent = "Try again!";
		if(attempts === 0){
				gameOver();
				changeAllColors(pickedColor);
			}
		}
}

function checkLevel(){
	if(isEasy){
		attempts = 2;
	}else{
		attempts = 3;
	}
}

function gameOver(){
	span_result.textContent = "Game Over :(";
	changeAllColors();
}

function random_picked(quantity_of_squares){
	//This function just chooses a number between 0 and quantity_of_squares to set the color to be guessed
	var random = Math.floor((Math.random() * quantity_of_squares) + 0);
	console.log(random);
	return random;
}

function select_color_range(times){
	//This will just creat the array with the colors
	var arr_colors = [];
	for (var i = 0; i < times; i++) {
		arr_colors.push(random_color());
	}
	return arr_colors;
}

function random_color(){
	//This will draw 6 different rgbs
	var r = Math.floor((Math.random() * 256));
	var g = Math.floor((Math.random() * 256));
	var b = Math.floor((Math.random() * 256));
	var colors = "rgb(" + r + ", " + g + ", " + b + ")";
	return colors;
}




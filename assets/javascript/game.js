var showMe = document.getElementById("showMe");
var riggity = document.getElementById("riggity");
var yesF = document.getElementById("yesF")
function playAudio(audio) {
	audio.play();
}
playAudio(showMe);
//word choices for the computer
var wordChoices = [
		["h", "y", "p", "e", "r", " ", "t", "e", "x", "t"], 
		["j","a","v","a"," ","s","c","r","i","p","t"], 
		["b","o","o","t","s","t","r","a","p"],
		["p","y","t","h","o","n"], 
		["c","a","s","c","a","d","i","n","g"], 
		["c","h","r","o","m","e"," ","d","e","v"," ","t","o","o","l","s"]
]
//alphabet used in for loop to make sure a letter was typed
var alphabet = [
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
]
//create an empty array for _ display and miss and hit count variables
	var letterCount = [];
	var missCount = 0;
	var hitCount = 0;
	var guessLeft = 6;
	var randomNum;
	var randomWord;
	var correctWordCount = 0;
	var winHang;
	

function selectWord(){
	//assign a random number equal to or less than the length of wordChoice array, 
	//-1 b/c .length starts from 1 and array index starts from 0
	 randomNum = Math.round((Math.random()*(wordChoices.length-1)));

	//use randomNum as index of wordChoice array
	 randomWord = wordChoices[randomNum];


	//add "_" and " " to letterCount array based on length of randomWord
	for (var i = 0; i < randomWord.length; i++){
		if (randomWord[i] === " "){
			//weird \xa0 in order to make a space in javascript show in HTML
			letterCount.push("\xa0");
			hitCount++;
		}
		else {
			letterCount.push("  _  ");
		}
	}
	return(randomWord);
	return(hitCount);
}

//show the guess area and create a function to be used to 
//"re-print" the area as correct guesses are made
function showLetterCount(){
	for (var i = 0; i < letterCount.length; i++){
		var letterSpot = document.getElementById("letterSpot");
		var letter = document.createTextNode(letterCount[i]);
		letterSpot.appendChild(letter);
	}
}

//allow user input
document.onkeyup = function(event) {
  var userInput = event.key;
  // In case caps lock is on
  userInput = userInput.toLowerCase();
  // guessedLetters.push(userInput);
  
  //only procede if user presses a letter
  for (var l = 0; l < alphabet.length; l++){
  	if(userInput === alphabet[l]){
  
			//check for match and update letterCount with the correct user guess
		  for (var j = 0; j < randomWord.length; j++){
		  	if(randomWord[j] === userInput && " " + userInput + " " !== letterCount[j]){
		  		letterCount[j] = " " + userInput + " "
		  		//for use when recording wrong guesses below
		  		var match = true;
		  		
		  		//remove the "_" and replace with correct user guess: 
		  		//since letterCount array was updated access the html at "letterSpot" and reuse the showLetterCount 
		  		//function to re-print the entire word with only the correct guesses so far showing
		  		var letterSpot = document.getElementById("letterSpot");
		  			letterSpot.innerHTML="";
		  			showLetterCount();

		  		hitCount++;
		  	}

		  	if(randomWord.length === hitCount){
		  		hitCount = "string to prevent hitCount form increasing for additional letter pressing after game ends";
				winHang = document.getElementById("winHang");
					winHang.innerHTML=("You have guessed correctly!!!");
		 			playAudio(yesF);
		 			setTimeout(endHit, 2500);
				}
			}	
		  
		  //add wrong letter to player visable list
		  if (!match) {
		  	var misses = document.getElementById("misses");
		  	var miss = document.createTextNode(" "+userInput+" ");
		  	misses.appendChild(miss);
		  //change image due to wrong letter
		  	missCount++;
		  	guessLeft--;

		  	document.getElementById("guessLeft").innerHTML = ("Remaining Guesses: " + guessLeft);

		  	document.getElementById("hangman");
		  	hangman.src = "assets/images/hangman"+missCount+".png";
		  }
			if (missCount === 6){
				hitCount = "string to fix bug";
		  		winHang = document.getElementById("winHang");
		  			winHang.innerHTML=("You are hanged!!!");
		  			playAudio(riggity);
		  			setTimeout(endMiss, 2500);
		  }	 
		}
	}
}
	function endMiss(){
		document.getElementById("misses").innerHTML="Wrong Letters: ";
		letterCount = [];
		missCount = 0;
		guessLeft = 6;
		hitCount = 0;
		guessCount = 0;
		document.getElementById("guessLeft").innerHTML = ("Remaining Guesses: " + guessLeft);
		document.getElementById("letterSpot").innerHTML="";
		document.getElementById("hangman");
		  	hangman.src = "assets/images/hangman"+0+".png";
		selectWord();
		showLetterCount();
	}

	function endHit(){
		document.getElementById("misses").innerHTML="Wrong Letters: ";
		correctWordCount++
		letterCount = [];
		missCount = 0;
		guessCount = 0;
		hitCount = 0;
		guessLeft = 6;
		document.getElementById("guessLeft").innerHTML = ("Remaining Guesses: " + guessLeft);
		document.getElementById("letterSpot").innerHTML="";
		document.getElementById("wordsSolved").innerHTML=("Number of words solved correctly: " + correctWordCount);
		document.getElementById("hangman");
		  	hangman.src = "assets/images/hangman"+0+".png";
		selectWord();
		showLetterCount();
	}

function start(){
	selectWord();
	showLetterCount();
}
window.onload = start;

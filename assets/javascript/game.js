var wordChoices = [
		["h", "y", "p", "e", "r", " ", "t", "e", "x", "t"], 
		["j","a","v","a"," ","s","c","r","i","p","t"], 
		["b","o","o","t","s","t","r","a","p"],
		["p","y","t","h","o","n"], 
		["c","a","s","c","a","d","i","n","g"], 
		["c","h","r","o","m","e"," ","d","e","v"," ","t","o","o","l","s"]
]
var alphabet = [
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
]
//assign a random number equal to or less than the length of wordChoice array
var randomNum = Math.floor((Math.random()*(wordChoices.length-1)));

//use randomNum as index of wordChoice array
var randomWord = wordChoices[randomNum];

//create an empty array for _ display
var letterCount = [];
var missCount = 0;

//add "_" and " " to letterCount array based on length of randomWord
for (var i = 0; i < randomWord.length; i++){
	if (randomWord[i] === " "){
		letterCount.push(" ");
	}
	else {
		letterCount.push("  _  ");
	}
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
  // console.log(userInput);

  //only porcede if user presses a letter
  for (var l = 0; l < alphabet.length; l++){
  	if( userInput === alphabet[l]){
  
			//check for match and update letterCount with the correct user guess
		  for (var j = 0; j < randomWord.length; j++){
		  	if(randomWord[j] === userInput){
		  		letterCount[j] = " " + userInput + " "
		  		//for use when recording wrong guesses below
		  		var match = true;

		  		//remove the "_" and replace with correct user guess: 
		  		//since letterCount array was updated access the html at "letterSpot" and reuse the showLetterCount 
		  		//function to re-print the entire word with only the correct guesses so far showing
		  		var letterSpot = document.getElementById("letterSpot");
		  			letterSpot.innerHTML="";
		  			showLetterCount();
		  	}
		  }
		  	//add wrong letter to player visable list
		  	if (!match) {
		  		var misses = document.getElementById("misses");
		  		var miss = document.createTextNode(" "+userInput+" ");
		  		misses.appendChild(miss);
		  	//change image due to wrong letter
		  		missCount++;
		  		document.getElementById("hangman");
		  		hangman.src = "assets/images/hangman"+missCount+".png";
		  	} 
				if (missCount === 6){
		  		alert("You are hanged!!!")
		  	}		 
		}
	}
}
function start(){
	showLetterCount();
}
window.onload = start;



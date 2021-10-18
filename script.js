var [wins, losses, abortions] = [0, 0, 0];
  var gameInProcess, answer, maskedAnswer, wrongGuesses;
  const masthead = document.querySelector("h1");
 
  const commonWords = ["opencode", "jack sparrow", "their", "would", "about", "there", "think", "which", "carry", "drive", "avoid", "imagine", "tonight", "close", "finish", "yourself", "theory", "impact", "respond", "property", "instead", "improve", "stuff"];
  hideAll("#tally span");
  document.querySelector("#new-game").addEventListener("click", newGame);


function newGame() {
  if (gameInProcess == true) 
    aborted();
  gameInProcess = true; 
  masthead.innerText = "Mission Starts";
  masthead.setAttribute("status", "normal"); 
  answer = newRandomWord();
  console.log("Hey you're cheating! " + 'Close the console! The answer is "' + answer + '"'); 
  wrongGuesses = 0;
  resetKeypad();
  maskedAnswer = []; 
  for (var i of answer)
    maskedAnswer.push("_");
  updateDisplayWord(); 
  hang(); 
}

function newRandomWord() {
  return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function verifyGuess() { 
  var guessedLetter = this.innerText.toLowerCase();

  if (answer.toLowerCase().includes(guessedLetter)) {
  
    for (var i in maskedAnswer) {
      if (answer[i] == guessedLetter)
        maskedAnswer[i] = answer[i];
    }
    updateDisplayWord();
    if (maskedAnswer.includes("_") == false) 
      escaped();
   
    this.classList.toggle("correct-letter", true);
    this.removeEventListener("click", verifyGuess);
  } else {
   
    this.classList.toggle("incorrect-letter", true); 
    this.removeEventListener("click", verifyGuess);
    wrongGuesses++;
    hang();
  }
}

function updateDisplayWord() {
  var display = "";
  for (var i of maskedAnswer)
    display += i + " ";
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function aborted() {
  abortions++;
  document.querySelector("#abortions").innerText = abortions;
  unhideAll(".abortions");
}

function hang() { 
  switch (wrongGuesses) {
    case 0:
      hideAll("svg *");
      break;
    case 1:
      unhideAll(".gallows");
      break;
    case 2:
      unhide("#head");
      break;
    case 3:
      unhide("#body");
      break;
    case 4:
      unhide("#left-arm");
      break;
    case 5:
      unhide("#right-arm");
      break;
    case 6:
      unhide("#left-leg");
      break;
    case 7:
      unhide("#right-leg");
      hanged();
      break;
    default:
      newGame();
  }
}


function hanged() { 
  gameInProcess = false;
  masthead.innerText = "DIED";
  masthead.setAttribute("status", "hanged");
  losses++;
  removeAllListeners();
  unhideAll(".losses");
  document.querySelector("#losses").innerText = losses;
 
  var display = "";
  for (var i of answer)
    display += i + " ";
  display.slice(0, -1);
  document.querySelector("#guessing").textContent = display;
}

function escaped() { 
  gameInProcess = false;
  masthead.innerText = "Thankyou, Captain Jack Spparow will remember this";
  masthead.setAttribute("status", "escaped");
  wins++;
  removeAllListeners();
  unhideAll(".wins");
  document.querySelector("#wins").innerText = wins;
}

function removeAllListeners() { 
  for (let i of document.querySelectorAll("#keypad a")) {
    i.removeEventListener("click", verifyGuess);
    i.classList.toggle("finished", true);
  }
}

function resetKeypad() {
  for (var i of document.querySelectorAll("#keypad div")) 
    i.innerText = "";
  populateRow(1, "QWERTYUIOP");
  populateRow(2, "ASDFGHJKL");
  populateRow(3, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) { 
  for (let i of rowLetters) {
    let key = document.createElement("a");
    key.id = i.toLowerCase();
    key.append(i);
    key.addEventListener("click", verifyGuess);
    document.querySelector("#keypad--row" + rowNumber).append(key);
  }
}

function unhide(targetElement) {
  document.querySelector(targetElement).classList.toggle("hidden", false);
}

function hideAll(targetElements) {
  for (let i of document.querySelectorAll(targetElements))
    i.classList.toggle("hidden", true);
}

function unhideAll(targetElements) {
  for (let i of document.querySelectorAll(targetElements))
    i.classList.toggle("hidden", false);
}
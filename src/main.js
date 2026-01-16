import words from "./words.js";
import letters from "./letters.js";

const lettersContainer = document.getElementById("lettersContainer");
const wordContainer = document.getElementById("wordContainer");

const randomWordFunc = () => words[Math.floor(Math.random() * 3598)].split('')
let randomWord = [];
let underscoreWord = [];
let constantWord = [];
let attempts = 10;

letters.forEach(letter  => {
    const letterDiv = document.createElement("div")
    letterDiv.textContent = letter
    letterDiv.classList.add("letterOfChoice")
    letterDiv.addEventListener("click", () => {
        checkCorrect(randomWord, letter)
    })

    if (lettersContainer) {
        lettersContainer.appendChild(letterDiv)
    }
})

function checkCorrect(word, letter) {
    if (word.includes(letter.toLowerCase())) {
        for (let i = word.length - 1; i >= 0; i--) {
            if (letter.toLowerCase() === word[i]) {
                word.splice(word.indexOf(letter.toLowerCase()), 1)
            }
        }
        for (let i = 0; i < constantWord.length; i++) {
            if (letter.toLowerCase() === constantWord[i]) {
                underscoreWord[i] = constantWord[i];
                wordContainer.children[i].textContent = letter;
            }
        }

        console.log(word)
        console.log("Correct letter")
    } else {
        console.log("Wrong letter")
        attempts --;
        document.getElementById("attCount").textContent = attempts;
    }
    victory(word, attempts)
    console.log(underscoreWord)
}

function previewWord(word) {
    wordContainer.innerHTML = "";

    for (let letter of word) {
        underscoreWord.push("_")
        const letterDiv = document.createElement("div")
        letterDiv.textContent = "_"
        letterDiv.classList.add("letterOfWord")
        wordContainer.appendChild(letterDiv)
    }
}

function victory(word) {
    if (word.length === 0) {
        showOverlay("Congratulations! You won")
    } else if (attempts === 0) {
        showOverlay("Oops! You lost")
    }
}

function showOverlay(isWon) {
    const overlayScreen = document.createElement("div")
    overlayScreen.classList.add("overlay")

    const overlayContent = document.createElement("div")

    const overlayMessage = document.createElement("p")
    overlayMessage.textContent = isWon

    const overlayScreenBtn = document.createElement("button")
    overlayScreenBtn.classList.add("overlayBtn")
    overlayScreenBtn.textContent = "Restart"

    overlayScreenBtn.addEventListener("click", () => {
        overlayScreen.remove()
        startGame()
    })

    overlayContent.appendChild(overlayScreenBtn)
    overlayContent.appendChild(overlayMessage)
    overlayScreen.appendChild(overlayContent)
    document.body.appendChild(overlayScreen)
}

function startGame() {
    wordContainer.innerHTML = "";
    attempts = 10;
    document.getElementById("attCount").textContent = attempts;
    underscoreWord = [];

    randomWord = randomWordFunc();
    constantWord = [...randomWord];

    previewWord(randomWord)

    console.log(randomWord);
}


startGame()

console.log(underscoreWord)
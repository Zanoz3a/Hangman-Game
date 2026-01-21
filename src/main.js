import words from "./words.js";
import letters from "./letters.js";

const lettersContainer = document.getElementById("lettersContainer");
const wordContainer = document.getElementById("wordContainer");

const randomWordFunc = () => words[Math.floor(Math.random() * 3598)].split('')
let randomWord = [];
let underscoreWord = [];
let constantWord = [];
let alreadyPressed = [];
let attempts = 10;

letters.forEach(tapLetter  => {
    const letterDiv = document.createElement("div")
    letterDiv.textContent = tapLetter
    letterDiv.classList.add("letterOfChoice")
    letterDiv.addEventListener("click", () => {
        checkCorrect(randomWord, tapLetter)
        letterDiv.classList.add("pressedLetter")
        alreadyPressed.push(letterDiv.textContent)
    })

    if (lettersContainer) {
        lettersContainer.appendChild(letterDiv)
    }
})

function keyPressed(e) {
    const keyLetter = e.key.toUpperCase();
    if (letters.includes(keyLetter) && !alreadyPressed.includes(keyLetter)) {
        checkCorrect(randomWord, keyLetter)
        document.querySelectorAll(".letterOfChoice").forEach(letter => {
            if (letter.textContent === keyLetter.toUpperCase()) {
                letter.classList.add("pressedLetter")
                alreadyPressed.push(letter.textContent)
            }
        })
    }
}

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

        document.removeEventListener("keydown", keyPressed);
        document.addEventListener("keydown", restartByRKey);
    } else if (attempts === 0) {
        showOverlay("Oops! You lost")

        document.removeEventListener("keydown", keyPressed);
        document.addEventListener("keydown", restartByRKey);
    }
}

function showOverlay(isWon) {
    const overlayScreen = document.createElement("div")
    overlayScreen.classList.add("overlay")

    const overlayContent = document.createElement("div")
    overlayContent.classList.add("overlayContent")

    const isWinMessage = document.createElement("p")
    isWinMessage.textContent = isWon;
    isWinMessage.classList.add("isWinMessage")

    const guessedWord = document.createElement("p")
    guessedWord.textContent = `The hidden word was: ${toUpper(constantWord)}`;
    guessedWord.classList.add("guessedWord")
    /*Тоже добавить блок "загаданное слово = constantWord"*/
    /*Нахуя я это написал?*/

    const overlayScreenBtn = document.createElement("button")
    overlayScreenBtn.classList.add("overlayBtn")
    overlayScreenBtn.textContent = "Restart"

    overlayScreenBtn.addEventListener("click", () => {
        overlayScreen.remove()
        startGame()
    })

    overlayContent.appendChild(overlayScreenBtn)
    overlayContent.appendChild(isWinMessage)
    overlayContent.appendChild(guessedWord)
    overlayScreen.appendChild(overlayContent)
    document.body.appendChild(overlayScreen)

}

function restartByRKey(e) {
    if (e.key === "r") {
        startGame()
        document.querySelector(".overlay").remove()
    }
}

function toUpper(word) {
    word = word.join('');
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function startGame() {
    wordContainer.innerHTML = "";
    attempts = 10;
    document.getElementById("attCount").textContent = attempts;
    underscoreWord = [];
    alreadyPressed = [];

    randomWord = randomWordFunc();
    constantWord = [...randomWord];

    document.addEventListener("keydown", keyPressed);
    document.removeEventListener("keydown", restartByRKey);

    previewWord(randomWord)
    document.querySelectorAll(".pressedLetter").forEach(
        element => {element.classList.remove("pressedLetter")});
    console.log(randomWord);
}


startGame()

console.log(underscoreWord)
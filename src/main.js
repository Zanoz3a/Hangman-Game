import words from "./words.js";
import letters from "./letters.js";

const lettersContainer = document.getElementById("lettersContainer");

const randomWord = words[Math.floor(Math.random() * 3598)]

letters.forEach(letter  => {
    const letterDiv = document.createElement("div")
    letterDiv.textContent = letter
    letterDiv.classList.add("letter")
    letterDiv.addEventListener("click", () => {
        checkCorrect(randomWord, letter)
    })

    if (lettersContainer) {
        lettersContainer.appendChild(letterDiv)
    }
})

function checkCorrect(searchWord, letter) {
    if (searchWord.includes(letter.toLowerCase()))  {
        console.log("correct")
    }
}

console.log(randomWord);
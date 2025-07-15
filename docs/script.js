
const wordsByCategory = {
    "Animals": ["cat", "dog", "zebra", "panda", "kangaroo", "lion", "tiger", "elephant"],
    "Fruits": ["apple", "orange", "banana", "mango", "pineapple", "grape", "watermelon", "jackfruit"],
    "Foods": ["pizza", "burger", "noodles", "biryani", "pasta", "salad"],
    "Countries": ["bangladesh", "india", "canada", "brazil", "australia", "france", "germany"],
    "Colors": ["red", "blue", "green", "yellow", "purple", "orange"],
    "Sports": ["football", "cricket", "basketball"]
};

let selectedCategory = "";
let selectedWord = "";
let guessedLetters = new Set();
let wrongGuesses = 0;
const maxWrong = 6;

function startGame() {
    const categories = Object.keys(wordsByCategory);
    selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = wordsByCategory[selectedCategory];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters.clear();
    wrongGuesses = 0;

    document.querySelector("#category span").textContent = selectedCategory;
    document.querySelector("#hint span").textContent = "_ ".repeat(selectedWord.length).trim();
    document.getElementById("hangman-image").src = "assets/hangman0.png";
    document.getElementById("message").textContent = "";
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
}

function guessLetter() {
    const input = document.getElementById("guess-input");
    const letter = input.value.toLowerCase();
    input.value = "";

    if (!letter.match(/^[a-z]$/) || guessedLetters.has(letter)) {
        document.getElementById("message").textContent = "⚠️ Invalid or repeated guess.";
        return;
    }

    guessedLetters.add(letter);

    if (selectedWord.includes(letter)) {
        let hint = "";
        for (let char of selectedWord) {
            hint += guessedLetters.has(char) ? char + " " : "_ ";
        }
        document.querySelector("#hint span").textContent = hint.trim();

        if (!hint.includes("_")) {
            document.getElementById("message").textContent = "🎉 You win!";
            document.getElementById("guess-input").disabled = true;
        }
    } else {
        wrongGuesses++;
        document.getElementById("hangman-image").src = "assets/hangman" + wrongGuesses + ".png";
        document.getElementById("message").textContent = `❌ Wrong: ${wrongGuesses}/${maxWrong}`;
        if (wrongGuesses >= maxWrong) {
            document.querySelector("#hint span").textContent = selectedWord;
            document.getElementById("message").textContent = `💀 You lost! Word was '${selectedWord}'.`;
            document.getElementById("guess-input").disabled = true;
        }
    }
}

window.onload = startGame;

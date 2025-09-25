'use strict';

let randomNumber;
let attempts;
let previousGuesses;
let scoreValue;
let highscore = 0;

function initGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    previousGuesses = [];
    console.log("🔢 New game started. The number is:", randomNumber);

    document.querySelector('.message').textContent = 'Start guessing...';
    const guessInput = document.querySelector('.guess');
    guessInput.value = '';
    guessInput.disabled = false;
    document.querySelector('.check').disabled = false;
    scoreValue = 20;
    document.querySelector('.score').textContent = scoreValue;
    document.querySelector('.highscore').textContent = highscore;
    document.querySelector('.message').style.color = '';
    document.body.style.backgroundColor = '';
    document.querySelector('.number').textContent = '?';
    guessInput.focus();
}

document.addEventListener("DOMContentLoaded", () => {
    initGame();

    const guessBtn = document.querySelector('.check');
    const resetBtn = document.querySelector('.again');
    const guessInput = document.querySelector('.guess');

    function submitGuess() {
        const message = document.querySelector('.message');
        const score = document.querySelector('.score');
        const userGuess = Number(guessInput.value);

        if (!userGuess || userGuess < 1 || userGuess > 100) {
            message.textContent = "Please enter a valid number between 1 and 100.";
            message.style.color = "red";
            document.body.style.backgroundColor = '#fc0202ff';
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        if (userGuess !== randomNumber && previousGuesses.includes(userGuess)) {
            message.textContent = `You've already guessed ${userGuess}. Try a different number!`;
            message.style.color = "purple";
            document.body.style.backgroundColor = '#fc0202ff';
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        let isRepeat = false;
        if (userGuess !== randomNumber && previousGuesses.includes(userGuess)) {
            isRepeat = true;
        }
        if (!isRepeat) {
            attempts++;
            if (userGuess !== randomNumber) {
                scoreValue--;
                score.textContent = scoreValue;
            }
        }

        if (userGuess !== randomNumber && !previousGuesses.includes(userGuess)) {
            previousGuesses.push(userGuess);
        }

        if (userGuess === randomNumber) {
            message.textContent = `🎉 Correct! The number was ${randomNumber}. You guessed it in ${attempts} tries.`;
            message.style.color = "green";
            guessInput.disabled = true;
            guessBtn.disabled = true;
            document.body.style.backgroundColor = '#209e1cff';
            document.querySelector('.number').textContent = randomNumber;
           
            if (scoreValue > highscore) {
                highscore = scoreValue;
            }
            document.querySelector('.highscore').textContent = highscore;
            document.querySelector('.score').textContent = scoreValue;
        } else if (attempts >= 20) {
            message.textContent = `❌ Game over! You've used all 20 attempts. The number was ${randomNumber}.`;
            message.style.color = "red";
            guessInput.disabled = true;
            guessBtn.disabled = true;
            document.body.style.backgroundColor = '#fc0202ff';
            document.querySelector('.number').textContent = randomNumber;
        } else if (userGuess < randomNumber) {
            message.textContent = "📉 Too low! Try again.";
            message.style.color = "blue";
            document.body.style.backgroundColor = '#fc0202ff';
        } else {
            message.textContent = "📈 Too high! Try again.";
            message.style.color = "orange";
            document.body.style.backgroundColor = '#fc0202ff';
        }

        guessInput.value = '';
        guessInput.focus();
    }

    guessBtn.addEventListener("click", submitGuess);
    resetBtn.addEventListener("click", () => {
        initGame();
        guessInput.focus();
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.key === 'Enter') {
            if (!guessBtn.disabled && !guessInput.disabled) {
                submitGuess();
                guessInput.focus();
            }
        } else if (e.code === 'Space' || e.key === ' ') {
            initGame();
            guessInput.focus();
        }
    });
});

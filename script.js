const wordList = "small say mountain not big Indian it's side good up form grow look spell oil thing what question him mountain might face study life process point year school".split(" ");

let timeLeft = 60;
let timer = null;
let wordsTyped = 0;
let correctWords = 0;
let currentWordIndex = 0;
let isStarted = false;

const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm-val');
const accuracyDisplay = document.getElementById('accuracy-val');
const resetBtn = document.getElementById('reset-btn');

function initGame() {
    wordDisplay.innerHTML = "";
    wordList.sort(() => Math.random() - 0.5);
    wordList.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word + " ";
        span.classList.add('word');
        if (index === 0) span.classList.add('current-word');
        wordDisplay.appendChild(span);
    });
}

function startTimer() {
    if (isStarted) return;
    isStarted = true;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft === 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    wordInput.disabled = true;
    const wpm = Math.round((correctWords / 1)); // for 1 minute test
    const accuracy = wordsTyped > 0 ? Math.round((correctWords / wordsTyped) * 100) : 0;
    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy + "%";
}

wordInput.addEventListener('input', (e) => {
    startTimer();
    const spans = wordDisplay.querySelectorAll('span');
    const inputVal = wordInput.value;

    if (inputVal.endsWith(" ")) {
        const typedWord = inputVal.trim();
        if (typedWord === wordList[currentWordIndex]) {
            spans[currentWordIndex].classList.add('correct');
            correctWords++;
        } else {
            spans[currentWordIndex].classList.add('wrong');
        }
        
        spans[currentWordIndex].classList.remove('current-word');
        currentWordIndex++;
        wordsTyped++;
        
        if (spans[currentWordIndex]) {
            spans[currentWordIndex].classList.add('current-word');
        }
        
        wordInput.value = "";
    }
});

resetBtn.addEventListener('click', () => {
    location.reload();
});

initGame();

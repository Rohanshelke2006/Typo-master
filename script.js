const dictionary = [
    "the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "as", "with", "his", "they", "I",
    "at", "be", "this", "have", "from", "or", "one", "had", "by", "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said",
    "there", "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them", "these", "so",
    "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", "people",
    "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part"
];

let wordList = [];
let timeLeft = 60;
let timer = null;
let isStarted = false;

let currentWordIndex = 0;
let currentCharacterIndex = 0;
let totalTypedCharacters = 0;
let correctCharacters = 0;

const wordDisplay = document.getElementById('word-display');
const wordsContainer = document.getElementById('words-container');
const caret = document.getElementById('caret');
const wordInput = document.getElementById('word-input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm-val');
const accuracyDisplay = document.getElementById('accuracy-val');
const resetBtn = document.getElementById('reset-btn');

function getRandomWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function addWordsToBuffer(amount = 30) {
    for (let i = 0; i < amount; i++) {
        const wordText = getRandomWord();
        wordList.push(wordText);

        const wordSpan = document.createElement('span');
        wordSpan.classList.add('word');

        for (let j = 0; j < wordText.length; j++) {
            const letterSpan = document.createElement('span');
            letterSpan.innerText = wordText[j];
            letterSpan.classList.add('letter');
            wordSpan.appendChild(letterSpan);
        }
        wordsContainer.appendChild(wordSpan);
    }
}

function initGame() {
    clearInterval(timer);
    timeLeft = 60;
    isStarted = false;
    currentWordIndex = 0;
    currentCharacterIndex = 0;
    totalTypedCharacters = 0;
    correctCharacters = 0;
    wordList = [];

    timerDisplay.innerText = timeLeft;
    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "0%";
    wordInput.value = "";
    wordInput.disabled = false;
    wordsContainer.innerHTML = "";
    
    // Reset horizontal position back to zero
    wordsContainer.style.transform = "translateX(0px)";

    addWordsToBuffer(60);
    wordsContainer.children[0].classList.add('current-word');
    
    setTimeout(updateCaretPosition, 10);
    wordInput.focus();
}

function startTimer() {
    if (isStarted) return;
    isStarted = true;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        calculateStats();
        if (timeLeft === 0) endGame();
    }, 1000);
}

function calculateStats() {
    const timeElapsed = 60 - timeLeft;
    if (timeElapsed > 0) {
        const wpm = Math.round((correctCharacters / 5) / (timeElapsed / 60));
        wpmDisplay.innerText = Math.max(0, wpm);
    }
    const accuracy = totalTypedCharacters > 0 ? Math.round((correctCharacters / totalTypedCharacters) * 100) : 0;
    accuracyDisplay.innerText = accuracy + "%";
}

function updateCaretPosition() {
    const currentWordElement = wordsContainer.children[currentWordIndex];
    if (!currentWordElement) return;

    const letters = currentWordElement.querySelectorAll('.letter');
    let targetLeft;

    if (currentCharacterIndex < letters.length) {
        const activeLetter = letters[currentCharacterIndex];
        targetLeft = activeLetter.offsetLeft;
    } else {
        const lastLetter = letters[letters.length - 1];
        targetLeft = lastLetter.offsetLeft + lastLetter.offsetWidth;
    }

    // Caret moves across the line relative to container's active layout placement
    caret.style.left = `${targetLeft}px`;
    
    // STEP-BY-STEP TRACKING MOTOR:
    // If your caret crosses past 200px from the left boundary, 
    // shift the word track left in perfect sync with your keystrokes.
    const trackingThreshold = 200;
    if (targetLeft > trackingThreshold) {
        wordsContainer.style.transform = `translateX(-${targetLeft - trackingThreshold}px)`;
        caret.style.left = `${trackingThreshold}px`; // Pin caret in place visually while stream rolls
    } else {
        wordsContainer.style.transform = "translateX(0px)";
    }
}

wordInput.addEventListener('input', (e) => {
    startTimer();

    const currentWordElement = wordsContainer.children[currentWordIndex];
    const letters = currentWordElement.querySelectorAll('.letter');
    const inputValue = wordInput.value;

    if (inputValue.endsWith(' ')) {
        const typedWordValue = inputValue.trim();
        
        if (typedWordValue === "") {
            wordInput.value = "";
            return;
        }

        // Catch missing letters if skipped
        for (let i = currentCharacterIndex; i < letters.length; i++) {
            letters[i].classList.add('wrong');
            totalTypedCharacters++;
        }

        currentWordElement.classList.remove('current-word');
        currentWordIndex++;
        currentCharacterIndex = 0;

        if (currentWordIndex >= wordsContainer.children.length - 15) {
            addWordsToBuffer(30);
        }

        wordsContainer.children[currentWordIndex].classList.add('current-word');
        wordInput.value = "";
        updateCaretPosition();
        calculateStats();
        return;
    }

    const typedLength = inputValue.length;
    currentCharacterIndex = typedLength;

    letters.forEach((letterSpan, idx) => {
        if (idx < typedLength) {
            if (inputValue[idx] === letterSpan.innerText) {
                if (!letterSpan.classList.contains('correct') && !letterSpan.classList.contains('wrong')) {
                    correctCharacters++;
                    totalTypedCharacters++;
                }
                letterSpan.classList.add('correct');
                letterSpan.classList.remove('wrong');
            } else {
                if (!letterSpan.classList.contains('correct') && !letterSpan.classList.contains('wrong')) {
                    totalTypedCharacters++;
                }
                letterSpan.classList.add('wrong');
                letterSpan.classList.remove('correct');
            }
        } else {
            letterSpan.classList.remove('correct', 'wrong');
        }
    });

    updateCaretPosition();
});

function endGame() {
    clearInterval(timer);
    wordInput.disabled = true;
    wordInput.value = "Test Finished!";
    calculateStats();
}

resetBtn.addEventListener('click', initGame);
window.addEventListener('load', initGame);

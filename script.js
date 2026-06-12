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

// Variables tracking letter-by-letter positioning
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

// Fetch random items from dictionary array
function getRandomWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

// Appends words to ensure the DOM always stays ahead of 80+ WPM speeds
function addWordsToBuffer(amount = 30) {
    for (let i = 0; i < amount; i++) {
        const wordText = getRandomWord();
        wordList.push(wordText);

        const wordSpan = document.createElement('span');
        wordSpan.classList.add('word');

        // Split words into individual letter elements for character tracking
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
    wordsContainer.style.transform = "translateY(0px)"; // Reset scroll

    // Build the initial list
    addWordsToBuffer(50);
    
    // Set active visibility modifiers on first word
    wordsContainer.children[0].classList.add('current-word');
    
    // Allow engine processing time before positioning cursor
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
        // Standard net WPM speed calculation based on standard 5 character word size metric
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
    let targetLeft, targetTop;

    if (currentCharacterIndex < letters.length) {
        // Position cursor right before the active letter
        const activeLetter = letters[currentCharacterIndex];
        targetLeft = activeLetter.offsetLeft;
        targetTop = activeLetter.offsetTop;
    } else {
        // Position cursor right after the final letter of a word if typed completely
        const lastLetter = letters[letters.length - 1];
        targetLeft = lastLetter.offsetLeft + lastLetter.offsetWidth;
        targetTop = lastLetter.offsetTop;
    }

    caret.style.left = `${targetLeft}px`;
    caret.style.top = `${targetTop}px`;

    // ROW AUTOMATIC SCROLL LOGIC
    // Shifts the wrapper up when text descends past baseline boundaries
    const rowOffset = targetTop;
    if (rowOffset > 45) {
        wordsContainer.style.transform = `translateY(-${rowOffset - 10}px)`;
    } else {
        wordsContainer.style.transform = "translateY(0px)";
    }
}

wordInput.addEventListener('input', (e) => {
    startTimer();

    const currentWordElement = wordsContainer.children[currentWordIndex];
    const letters = currentWordElement.querySelectorAll('.letter');
    const inputValue = wordInput.value;

    // Check if user submitted the current word via spacebar
    if (inputValue.endsWith(' ')) {
        const typedWordValue = inputValue.trim();
        
        // Block empty submissions via space spamming
        if (typedWordValue === "") {
            wordInput.value = "";
            return;
        }

        // Clean up remaining characters left untyped
        for (let i = currentCharacterIndex; i < letters.length; i++) {
            letters[i].classList.add('wrong');
            totalTypedCharacters++;
        }

        // Transition active structural metrics to next line element block
        currentWordElement.classList.remove('current-word');
        currentWordIndex++;
        currentCharacterIndex = 0;

        // INFINITE EXPANSION TRIGGER
        // If approaching the end of the loaded text grid, generate more words
        if (currentWordIndex >= wordsContainer.children.length - 15) {
            addWordsToBuffer(25);
        }

        wordsContainer.children[currentWordIndex].classList.add('current-word');
        wordInput.value = "";
        updateCaretPosition();
        calculateStats();
        return;
    }

    // REALTIME CHARACTER EVALUATION LOOP
    const typedLength = inputValue.length;
    currentCharacterIndex = typedLength;

    letters.forEach((letterSpan, idx) => {
        if (idx < typedLength) {
            // Letter has been typed
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
            // Letter hasn't been typed yet
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

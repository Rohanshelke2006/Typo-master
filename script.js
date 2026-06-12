// A massive dictionary of common typing test words
const dictionary = [
    "the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "as", "with", "his", "they", "I",
    "at", "be", "this", "have", "from", "or", "one", "had", "by", "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said",
    "there", "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them", "these", "so",
    "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", "people",
    "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part",
    "over", "new", "sound", "take", "only", "little", "work", "know", "place", "year", "live", "me", "back", "give", "most", "very", "after", "thing", "our", "just",
    "name", "good", "sentence", "man", "think", "say", "great", "where", "help", "through", "much", "before", "line", "right", "too", "mean", "old", "any", "same", "tell",
    "boy", "follow", "came", "want", "show", "also", "around", "form", "three", "small", "set", "put", "end", "does", "another", "well", "large", "must", "big", "even",
    "such", "because", "turn", "here", "why", "ask", "went", "men", "read", "land", "here", "home", "us", "move", "try", "kind", "hand", "picture", "again", "change",
    "off", "play", "spell", "air", "away", "animal", "house", "point", "page", "letter", "mother", "answer", "found", "study", "still", "learn", "should", "America", "world", "high"
];

let wordList = [];
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

// Generates a random set of words from the dictionary for the session
function generatePassage() {
    // Shuffle dictionary copies safely
    const shuffled = [...dictionary].sort(() => Math.random() - 0.5);
    // Grab 60 random words for a 1-minute test session
    return shuffled.slice(0, 60);
}

function initGame() {
    // Clear and reset interval states safely
    clearInterval(timer);
    timeLeft = 60;
    wordsTyped = 0;
    correctWords = 0;
    currentWordIndex = 0;
    isStarted = false;
    
    // UI Resets
    timerDisplay.innerText = timeLeft;
    wordInput.value = "";
    wordInput.disabled = false;
    wordDisplay.innerHTML = "";
    wordDisplay.scrollTop = 0; // scroll box back to top

    // Generate brand new unique test text
    wordList = generatePassage();

    // Render words to DOM
    wordList.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word;
        span.classList.add('word');
        if (index === 0) span.classList.add('current-word');
        wordDisplay.appendChild(span);
    });
    
    wordInput.focus();
}

function startTimer() {
    if (isStarted) return;
    isStarted = true;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        
        // Dynamic live stats processing while typing
        calculateStats();

        if (timeLeft === 0) endGame();
    }, 1000);
}

function calculateStats() {
    const timeElapsed = 60 - timeLeft;
    if (timeElapsed > 0) {
        // Standard WPM formula calculation based on active timeframe
        const wpm = Math.round((correctWords / timeElapsed) * 60);
        wpmDisplay.innerText = wpm;
    }
    const accuracy = wordsTyped > 0 ? Math.round((correctWords / wordsTyped) * 100) : 0;
    accuracyDisplay.innerText = accuracy + "%";
}

function endGame() {
    clearInterval(timer);
    wordInput.disabled = true;
    wordInput.value = "Test Completed!";
    calculateStats(); // Final score lock
}

wordInput.addEventListener('input', (e) => {
    startTimer();
    const spans = wordDisplay.querySelectorAll('span');
    const inputVal = wordInput.value;

    // Active matching checking while typing the current word (visual polish)
    const currentWord = wordList[currentWordIndex];
    if (currentWord.startsWith(inputVal.trim()) && inputVal.trim() !== "") {
        spans[currentWordIndex].classList.remove('wrong-temporary');
    } else if (inputVal.trim() !== "") {
        spans[currentWordIndex].classList.add('wrong-temporary');
    }

    // Checking space key entry indicating word submission
    if (inputVal.endsWith(" ")) {
        const typedWord = inputVal.trim();
        if (typedWord === "") return; // space prevention bypass

        spans[currentWordIndex].classList.remove('wrong-temporary');

        if (typedWord === currentWord) {
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
            
            // AUTOMATIC LINE SCROLL EFFECT: Keeps active word row visible
            if (spans[currentWordIndex].offsetTop > wordDisplay.scrollTop + 40) {
                wordDisplay.scrollTop = spans[currentWordIndex].offsetTop - 40;
            }
        }
        
        wordInput.value = "";
    }
});

// Soft reset instead of hard page reloading
resetBtn.addEventListener('click', initGame);

// Load the engine on startup
initGame();

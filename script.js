// ---- Large word dictionary (200+ common words) ----
const wordBank = [
    "the","be","to","of","and","a","in","that","have","it","for","not","on","with","he","as","you","do","at",
    "this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there","their","what",
    "so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no","just","him","know","take",
    "people","into","year","your","good","some","could","them","see","other","than","then","now","look","only","come","its","over","think","also",
    "back","after","use","two","how","our","work","first","well","way","even","new","want","because","any","these","give","day","most","us",
    "is","water","long","find","here","thing","great","little","own","under","name","very","through","just","form","sentence","large","spell","add","even",
    "land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try",
    "again","animal","point","mother","world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow",
    "study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm",
    "hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north",
    "open","seem","together","next","white","children","begin","got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter",
    "until","mile","river","car","feet","care","second","book","carry","took","science","eat","room","friend","began","idea","fish","mountain","stop","once",
    "base","hear","horse","cut","sure","watch","color","face","wood","main","enough","plain","girl","usual","young","ready","above","ever","red","list",
    "though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black","short","numeral","class","wind"
];

let timeLeft = 60;
let totalTime = 60;
let timer = null;
let wordsTyped = 0;
let correctWords = 0;
let wrongWords = 0;
let currentWordIndex = 0;
let isStarted = false;
let isFinished = false;
let currentWordList = [];

const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm-val');
const accuracyDisplay = document.getElementById('accuracy-val');
const correctDisplay = document.getElementById('correct-val');
const wrongDisplay = document.getElementById('wrong-val');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Pick how many words we need (generous buffer so we never run out mid-test)
function getWordCount() {
    return Math.max(60, totalTime * 4);
}

// Build a fresh random list of words from the dictionary (with repeats allowed)
function generateWordList(count) {
    const list = [];
    for (let i = 0; i < count; i++) {
        const randIndex = Math.floor(Math.random() * wordBank.length);
        list.push(wordBank[randIndex]);
    }
    return list;
}

function renderWords() {
    wordDisplay.innerHTML = "";
    currentWordList.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word;
        span.classList.add('word');
        if (index === 0) span.classList.add('current-word');
        wordDisplay.appendChild(span);
    });
}

function appendMoreWords(count) {
    const extra = generateWordList(count);
    currentWordList = currentWordList.concat(extra);
    extra.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word;
        span.classList.add('word');
        wordDisplay.appendChild(span);
    });
}

function initGame() {
    timeLeft = totalTime;
    timerDisplay.innerText = timeLeft;
    wordsTyped = 0;
    correctWords = 0;
    wrongWords = 0;
    currentWordIndex = 0;
    isStarted = false;
    isFinished = false;
    clearInterval(timer);
    wordInput.disabled = false;
    wordInput.value = "";
    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "0%";
    correctDisplay.innerText = "0";
    wrongDisplay.innerText = "0";
    currentWordList = generateWordList(getWordCount());
    renderWords();
    wordInput.focus();
}

function startTimer() {
    if (isStarted) return;
    isStarted = true;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    if (isFinished) return;
    isFinished = true;
    clearInterval(timer);
    wordInput.disabled = true;

    const minutes = totalTime / 60;
    const wpm = Math.round(correctWords / minutes);
    const accuracy = wordsTyped > 0 ? Math.round((correctWords / wordsTyped) * 100) : 0;

    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy + "%";
    correctDisplay.innerText = correctWords;
    wrongDisplay.innerText = wrongWords;
}

function scrollWordsIntoView(activeSpan) {
    const boxTop = wordDisplay.getBoundingClientRect().top;
    const spanTop = activeSpan.getBoundingClientRect().top;
    const diff = spanTop - boxTop;
    const lineHeight = parseFloat(getComputedStyle(wordDisplay).lineHeight);
    if (diff >= lineHeight * 2) {
        wordDisplay.scrollTop += lineHeight;
    }
}

wordInput.addEventListener('input', (e) => {
    if (isFinished) return;
    startTimer();

    const spans = wordDisplay.querySelectorAll('span');
    const inputVal = wordInput.value;

    if (inputVal.endsWith(" ")) {
        const typedWord = inputVal.trim();
        if (typedWord.length > 0) {
            if (typedWord === currentWordList[currentWordIndex]) {
                spans[currentWordIndex].classList.add('correct');
                correctWords++;
            } else {
                spans[currentWordIndex].classList.add('wrong');
                wrongWords++;
            }

            spans[currentWordIndex].classList.remove('current-word');
            currentWordIndex++;
            wordsTyped++;

            // If we're running low on remaining words, generate more on the fly
            if (currentWordIndex >= currentWordList.length - 10) {
                appendMoreWords(getWordCount());
            }

            const nextSpan = wordDisplay.querySelectorAll('span')[currentWordIndex];
            if (nextSpan) {
                nextSpan.classList.add('current-word');
                scrollWordsIntoView(nextSpan);
            }
        }
        wordInput.value = "";
    } else {
        // live feedback while typing the current word
        const currentSpan = spans[currentWordIndex];
        const target = currentWordList[currentWordIndex];
        if (target && target.startsWith(inputVal)) {
            currentSpan.classList.remove('wrong');
        } else if (inputVal.length > 0) {
            currentSpan.classList.add('wrong');
        }
    }
});

resetBtn.addEventListener('click', () => {
    initGame();
});

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        totalTime = parseInt(btn.dataset.time, 10);
        initGame();
    });
});

initGame();

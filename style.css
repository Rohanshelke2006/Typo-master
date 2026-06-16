:root {
    --bg-color: #0b0c0e;
    --card-color: #141619;
    --accent-blue: #4785ff;
    --text-main: #f1f2f5;
    --text-dim: #4c5055;
    --correct: #43a047;
    --wrong: #e53935;
}

body {
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: 'Inter', system-ui, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    width: 90%;
    max-width: 850px;
    text-align: center;
}

header h1 {
    font-size: 3rem;
    color: var(--accent-blue);
    margin-bottom: 5px;
    font-weight: 800;
}

header p {
    color: var(--text-dim);
    margin-top: 0;
    margin-bottom: 35px;
}

/* Single-row viewport framing system box */
.word-box {
    background: var(--card-color);
    padding: 0 30px;
    border-radius: 16px;
    font-size: 1.8rem;
    height: 80px; 
    display: flex;
    align-items: center;
    overflow: hidden; /* Clips elements safely out of perspective bounds */
    margin-bottom: 25px;
    border: 1px solid #1f2226;
    position: relative;
}

/* Horizontal Ribbon Track */
#words-container {
    display: flex;
    flex-wrap: nowrap; /* CRITICAL FIX: Stops vertical word wrapping completely */
    transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth horizontal panning */
    will-change: transform;
}

.word {
    margin-right: 22px;
    display: flex;
    white-space: nowrap;
}

.letter {
    color: var(--text-dim);
    transition: color 0.05s ease;
}

.letter.correct {
    color: var(--text-main);
}

.letter.wrong {
    color: var(--wrong);
    background-color: rgba(229, 57, 53, 0.12);
    border-radius: 2px;
}

/* Cursor Caret tracking line layout styles */
.caret {
    position: absolute;
    width: 3px;
    height: 1.8rem;
    background-color: var(--accent-blue);
    border-radius: 2px;
    transition: left 0.08s ease; /* Tracks keyboard typing inputs at high speed */
    animation: blink 1s infinite;
    z-index: 10;
}

@keyframes blink {
    50% { opacity: 0; }
}

.input-section {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 25px;
}

#word-input {
    flex: 1;
    background: var(--card-color);
    border: 2px solid #1f2226;
    border-radius: 12px;
    padding: 16px;
    color: white;
    font-size: 1.25rem;
    outline: none;
}

#word-input:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 4px rgba(71, 133, 255, 0.15);
}

#timer {
    font-size: 1.7rem;
    font-weight: bold;
    color: var(--accent-blue);
    min-width: 50px;
}

#reset-btn {
    background: var(--card-color);
    border: 1px solid #1f2226;
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.4rem;
}

#reset-btn:hover {
    background: #1c1e22;
}

.results-bar {
    display: flex;
    justify-content: center;
    gap: 60px;
    background: var(--card-color);
    padding: 20px;
    border-radius: 16px;
    border: 1px solid #1f2226;
}

.stat-box .label {
    display: block;
    color: var(--text-dim);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-box .value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--accent-blue);
}

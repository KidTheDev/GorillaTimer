let startTime = -10.00; // Starting at -0:10.00
let timerInterval;
let totalTime = 3 * 60; // 3 minutes in seconds
let currentTime = startTime;
let timeToBeat = null; // Initialize as null
let isGTCMode = false; // GTC mode flag

function formatTime(seconds) {
    const sign = seconds < 0 ? '-' : '';
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const sec = (absSeconds % 60).toFixed(2);
    return `${sign}${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('time');
    timerElement.textContent = formatTime(currentTime);
}

function updateTimeToBeatDisplay() {
    const ttbElement = document.getElementById('ttb-time');
    if (timeToBeat !== null && !isGTCMode) {
        ttbElement.textContent = formatTime(timeToBeat);
    } else {
        ttbElement.textContent = "--:--.--"; // Default if no TTB set or in GTC mode
    }
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (isGTCMode && currentTime > 0) {
                currentTime -= 0.01; // Count down in GTC mode
            } else if (!isGTCMode && currentTime < totalTime) {
                currentTime += 0.01; // Count up in regular mode
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            updateTimerDisplay();
        }, 10);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    currentTime = startTime;
    updateTimerDisplay();
    updateTimeToBeatDisplay();
    pauseTimer();
}

function setTimeToBeat() {
    if (!isGTCMode) {
        timeToBeat = currentTime; // Set the current time as the time to beat
        updateTimeToBeatDisplay();
    }
}

function updateStartTimeDisplay() {
    const startTimeDisplay = document.getElementById('start-time-display');
    startTimeDisplay.textContent = formatTime(startTime);
}

function changeStartTime(change) {
    startTime += change;
    currentTime = startTime;
    updateStartTimeDisplay();
    updateTimerDisplay();
}

// Handle GTC mode toggle
document.getElementById('gtc-mode-checkbox').addEventListener('change', function () {
    isGTCMode = this.checked;
    if (isGTCMode) {
        startTime = 30 * 60; // 30 minutes in seconds
        timeToBeat = null; // Remove Time to Beat in GTC mode
    } else {
        startTime = -10.00; // Reset to default start time in regular mode
    }
    resetTimer();
});

// Event listeners for buttons
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('set-ttb-btn').addEventListener('click', setTimeToBeat);

// Event listeners for changing start time
document.getElementById('start-time-up').addEventListener('click', () => changeStartTime(0.1));
document.getElementById('start-time-down').addEventListener('click', () => changeStartTime(-0.1));

updateTimerDisplay();
updateTimeToBeatDisplay();
updateStartTimeDisplay();

let countdown;
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const taskInput = document.getElementById('user-task');
const currentTaskDisplay = document.getElementById('currentTask');
const minutesSelect = document.getElementById('minutes');
const alarm = document.getElementById('alarm-sound');

function startTimer() {
    const taskName = taskInput.value.trim();
    
    if (taskName === "") {
        alert("Please enter a task before starting the timer!");
        return;
    }

    currentTaskDisplay.innerText = "Current Task: " + taskName;
    clearInterval(countdown);
    
    let seconds = parseInt(minutesSelect.value) * 60;
    displayTime(seconds);

    countdown = setInterval(() => {
        seconds--;
        displayTime(seconds);

        // Add pulse effect when under 60 seconds
        if (seconds <= 60) {
            timerDisplay.classList.add('timer-warning');
        } else {
            timerDisplay.classList.remove('timer-warning');
        }

      if (seconds <= 0) {
    clearInterval(countdown);
    timerDisplay.classList.remove('timer-warning');
    alarm.play();
    
    // --- ADD THESE LINES FOR HISTORY ---
    const li = document.createElement('li');
    li.innerText = `✔️ ${taskName} (${minutesSelect.value}m)`;
    li.style.color = "#00ffc8";
    li.style.textShadow = "0 0 5px #00ffc8";
    document.getElementById('task-list').appendChild(li);
    // -----------------------------------

    alert("Time is up! Great job on: " + taskName);
        }
    }, 1000);
}

function displayTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const remSecs = seconds % 60;
    timerDisplay.innerText = `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    timerDisplay.classList.remove('timer-warning');
    timerDisplay.innerText = minutesSelect.value + ":00";
    taskInput.value = "";
    currentTaskDisplay.innerText = "Waiting for task...";
});

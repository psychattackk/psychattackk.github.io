<div id="task-input">
  <input type="text" id="user-task" placeholder="What are you working on?">
</div>

<div id="timer-settings">
  <select id="minutes">
    <option value="25">25 Minutes</option>
    <option value="50">50 Minutes</option>
    <option value="5">5 Minutes (Break)</option>
  </select>
</div>

<div id="currentTask">Waiting for task...</div>
<div id="timer">25:00</div>

<div class="button-group">
  <button id="start-btn" class="btn">Start</button>
  <button id="reset-btn" class="btn">Reset</button>
</div>

let countdown;
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const taskInput = document.getElementById('user-task');
const currentTaskDisplay = document.getElementById('currentTask');
const minutesSelect = document.getElementById('minutes');

function startTimer() {
  const taskName = taskInput.value.trim();
  
  // Requirement: Only start if user puts in an input
  if (taskName === "") {
    alert("Please enter a task before starting the timer!");
    return;
  }

  // Update UI to show active task
  currentTaskDisplay.innerText = "Current Task: " + taskName;
  
  clearInterval(countdown);
  let seconds = parseInt(minutesSelect.value) * 60;

  countdown = setInterval(() => {
    seconds--;
    displayTime(seconds);

    if (seconds <= 0) {
      clearInterval(countdown);
      alert("Time is up! Great job on: " + taskName);
    }
  }, 1000);
}

function displayTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  timerDisplay.innerText = `${mins}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function resetTimer() {
  clearInterval(countdown);
  timerDisplay.innerText = minutesSelect.value + ":00";
  currentTaskDisplay.innerText = "Waiting for task...";
  taskInput.value = "";
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

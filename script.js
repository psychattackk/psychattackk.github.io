let countdown;
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const taskInput = document.getElementById('user-task');
const currentTaskDisplay = document.getElementById('currentTask');
const minutesSelect = document.getElementById('minutes');

function startTimer() {
    const taskName = taskInput.value.trim();
    
    // Check if input is empty
    if (taskName === "") {
        alert("Please enter a task before starting the timer!");
        return;
    }

    currentTaskDisplay.innerText = "Current Task: " + taskName;
    
    clearInterval(countdown);
    let seconds = parseInt(minutesSelect.value) * 60;

    countdown = setInterval(() => {
        seconds--;
        
        // Update display
        const mins = Math.floor(seconds / 60);
        const remSecs = seconds % 60;
        timerDisplay.innerText = `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;

        if (seconds <= 0) {
            clearInterval(countdown);
            alert("Time is up! Task complete: " + taskName);
        }
    }, 1000);
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    timerDisplay.innerText = "25:00";
    taskInput.value = "";
    currentTaskDisplay.innerText = "Waiting for task...";
});

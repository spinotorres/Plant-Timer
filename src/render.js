const path = require('path');

let isEditingTimer = false;
let timerInput = '';
let timerDuration = 0;
let currentDuration = 0;
let timerInterval = null;
let changeMarks = [];
let currentBackgroundIndex = 0;

const backgrounds = [
  'url("/Users/pedrotorres/Documents/Plant-timer/plant-timer/src/assets/frame-1.png")',
  'url("/Users/pedrotorres/Documents/Plant-timer/plant-timer/src/assets/frame-2.png")',
  'url("/Users/pedrotorres/Documents/Plant-timer/plant-timer/src/assets/frame-3.png")',
  'url("/Users/pedrotorres/Documents/Plant-timer/plant-timer/src/assets/frame-4.png")',
  'url("/Users/pedrotorres/Documents/Plant-timer/plant-timer/src/assets/frame-5.png")'
];

function buttonInfo() {
  const div = document.querySelector('.text_info');
  if (div.style.display === 'none' || div.style.display === '') {
    div.innerText = "This app is designed to remind the user to always water their plants!";
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
}

function buttonTitle() {
  window.location.href = "main.html";
}

function buttonSetTimer() {
  const visor = document.querySelector(".timer_visor");
  timerInput = '';
  isEditingTimer = true;
  timerDuration = 0;
  currentDuration = 0;
  currentBackgroundIndex = 0;
  changeMarks = [];
  visor.classList.add("editing");
  visor.textContent = "00:00:00";
  document.body.style.backgroundImage = backgrounds[0];
}

document.addEventListener("keydown", (e) => {
  if (!isEditingTimer) return;

  if (/^[0-9]$/.test(e.key) && timerInput.length < 6) {
    timerInput += e.key;
    updateVisorFromInput();
    e.preventDefault();
    return;
  }

  if (e.key === "Backspace") {
    timerInput = timerInput.slice(0, -1);
    updateVisorFromInput();
    e.preventDefault();
    return;
  }

  if (e.key === "Enter" || e.key === "Return" || e.code === "Enter" || e.code === "NumpadEnter") {
    e.preventDefault();
    confirmTimerInput();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const visor = document.querySelector(".timer_visor");
  if (visor) {
    visor.addEventListener("click", () => {
      if (isEditingTimer) confirmTimerInput();
    });
  }
});

function updateVisorFromInput() {
  const visor = document.querySelector(".timer_visor");
  const padded = timerInput.padStart(6, '0');
  const hrs = padded.slice(0, 2);
  const mins = padded.slice(2, 4);
  const secs = padded.slice(4, 6);
  visor.textContent = `${hrs}:${mins}:${secs}`;
}

function confirmTimerInput() {
  if (timerInput.length === 0) return;
  isEditingTimer = false;
  document.querySelector(".timer_visor").classList.remove("editing");

  const padded = timerInput.padStart(6, '0');
  const hrs = parseInt(padded.slice(0, 2));
  const mins = parseInt(padded.slice(2, 4));
  const secs = parseInt(padded.slice(4, 6));
  timerDuration = hrs * 3600 + mins * 60 + secs;
  currentDuration = timerDuration;

  changeMarks = [];
  const interval = Math.floor(timerDuration / 5);
  for (let i = 1; i <= 5; i++) {
    changeMarks.push(timerDuration - i * interval);
  }

  currentBackgroundIndex = 0;
  document.body.style.backgroundImage = backgrounds[0];
  updateTimerDisplay(currentDuration);
}

function updateTimerDisplay(seconds) {
  const visor = document.querySelector(".timer_visor");
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  visor.textContent = `${hrs}:${mins}:${secs}`;
}

function buttonStart() {
  if (currentDuration <= 0 || timerInterval || isEditingTimer) return;

  timerInterval = setInterval(() => {
    if (currentDuration > 0) {
      currentDuration--;
      updateTimerDisplay(currentDuration);

      if (
        currentBackgroundIndex < changeMarks.length &&
        currentDuration <= changeMarks[currentBackgroundIndex]
      ) {
        document.body.style.backgroundImage = backgrounds[currentBackgroundIndex];
        currentBackgroundIndex++;
      }

    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Water Time End!");
    }
  }, 1000);
}

function buttonStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function buttonReset() {
  buttonStop();
  timerDuration = 0;
  currentDuration = 0;
  updateTimerDisplay(0);
  currentBackgroundIndex = 0;
  document.body.style.backgroundImage = backgrounds[0];
}

document.getElementById('myGithub')?.addEventListener('click', (event) => {
  event.preventDefault();
  const { shell } = require('electron');

  document.getElementById('myGithub')?.addEventListener('click', (event) => {
    event.preventDefault();
    shell.openExternal('https://github.com/spinotorres');
  });
});

window.button_info = buttonInfo;
window.button_title = buttonTitle;
window.button_set_timer = buttonSetTimer;
window.button_start = buttonStart;
window.button_stop = buttonStop;
window.button_reset = buttonReset;
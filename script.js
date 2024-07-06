let minuteElem = document.querySelector('.minute');
let secElem = document.querySelector('.sec');
let msecElem = document.querySelector('.msec');
let lapContainer = document.querySelector('.laps');

let minute = 0;
let second = 0;
let millisecond = 0;
let interval;
let lapNumber = 0;

document.querySelector('.btn-play').addEventListener('click', start);
document.querySelector('.btn-pause').addEventListener('click', pause);
document.querySelector('.btn-lap').addEventListener('click', lap);
document.querySelector('.btn-reset').addEventListener('click', reset);
document.querySelector('.lap-clear').addEventListener('click', clearLaps);

function start() {
  if (!interval) {
    interval = setInterval(updateWatch, 10);
  }
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function lap() {
  lapNumber++;
  let lapTime = `${formatTime(minute)} : ${formatTime(second)} : ${formatTime(millisecond)}`;
  let lapItem = document.createElement('li');
  lapItem.classList.add('lap-item');
  lapItem.innerHTML = `<span class="lap-num">${lapNumber}</span><span class="lap-time">${lapTime}</span>`;
  lapContainer.appendChild(lapItem);
}

function reset() {
  pause();
  minute = 0;
  second = 0;
  millisecond = 0;
  lapNumber = 0;
  updateDisplay();
  lapContainer.innerHTML = '';
}

function clearLaps() {
  lapContainer.innerHTML = '';
}

function updateWatch() {
  millisecond++;
  if (millisecond >= 100) {
    millisecond = 0;
    second++;
    if (second >= 60) {
      second = 0;
      minute++;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  minuteElem.textContent = formatTime(minute) + ' :';
  secElem.textContent = formatTime(second) + ' :';
  msecElem.textContent = formatTime(millisecond);
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}
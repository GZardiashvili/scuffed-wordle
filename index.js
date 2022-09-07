'use strict';

let wordList = [
  // 'patio', 'darts', 'piano',
  'horse',
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let currentAttempt = '';
let history = ['rohan', 'wowzy', 'horse'];

let grid = document.getElementById('grid');
buildGrid();
updateGrid();
window.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {
  if (e.key === 'Backspace') {
    currentAttempt = currentAttempt.slice(0, -1);
  } else if (e.key === 'Enter') {
    history.push(currentAttempt);
    currentAttempt = '';
  } else if (currentAttempt.length < 5) {
    currentAttempt += e.key;
  }
  updateGrid();
}

function buildGrid() {
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < 5; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = '';
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of history) {
    drawAttempt(row, attempt, true);
    row = row.nextSibling;
  }
  drawAttempt(row, currentAttempt, false);
}

function drawAttempt(row, attempt, isCurrent) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    if (attempt[i] !== undefined) {
      cell.textContent = attempt[i];
    } else {
      // lol
      cell.innerHTML = '&nbsp;';
    }
    if (isCurrent) {
      cell.style.backgroundColor = getBgColor(attempt, i);
    } else {
      cell.style.backgroundColor = '#111';
    }
  }
}

function getBgColor(attempt, i) {
  let correctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return '#212121';
  }
  if (attemptLetter === correctLetter) {
    return '#538d4e';
  }
  return '#b59f3b';
}

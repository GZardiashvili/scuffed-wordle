'use strict';

let grid = document.getElementById('grid');

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

buildGrid();

let wordList = [
  // 'patio', 'darts', 'piano',
  'horse',
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let attempts = ['rohan', 'wowzy'];
let currentAttempt = '';

updateGrid();

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of attempts) {
    drawPastAttempt(row, attempt);
    row = row.nextSibling;
  }
  drawCurrentAttempt(row, currentAttempt);
}

function drawPastAttempt(row, attempt) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    cell.textContent = attempt[i];
    cell.style.backgroundColor = getBgColor(attempt, i);
  }
}

function drawCurrentAttempt(row, attempt) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    cell.textContent = attempt[i] || '';
  }
}

function getBgColor(attempt, i) {
  let corrctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return;
  }
  if (attemptLetter === corrctLetter) {
    return '#538d4e';
  }
  return '#b59f3b';
}

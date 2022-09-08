'use strict';

let wordList = [
  'patio',
  'darts',
  'piano',
  'horse',
  'hello',
  'water',
  'pizza',
  'sushi',
  'crabs',
];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let currentAttempt = '';
let history = [];

function handleKeyDown(e) {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
    return;
  }
  if (e.key === 'Backspace') {
    currentAttempt = currentAttempt.slice(0, -1);
  } else if (e.key === 'Enter') {
    if (currentAttempt.length < 5) {
      return;
    }
    if (!wordList.includes(currentAttempt)) {
      alert('Not in my thesaurus');
      return;
    }
    history.push(currentAttempt);
    currentAttempt = '';
  } else if (
    currentAttempt.length < 5 &&
    e.key.length === 1 &&
    e.key.match(/[a-z]/)
  ) {
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
      cell.style.backgroundColor = BLACK;
    }
  }
}

let BLACK = '#111';
let GREY = '#212121';
let LIGHTGREY = '#888';
let GREEN = '#538d4e';
let YELLOW = '#b59f3b';

function getBgColor(attempt, i) {
  let correctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return GREY;
  }
  if (attemptLetter === correctLetter) {
    return GREEN;
  }
  return YELLOW;
}

function buildKeyboard() {
  buildKeyboardRow('qwertyuiop', false);
  buildKeyboardRow('asdfghjkl', false);
  buildKeyboardRow('zxcvbnm', true);
}

function buildKeyboardRow(letters, isLastRow) {
  let row = document.createElement('div');
  if (isLastRow) {
    let button = document.createElement('button');
    button.className = 'button';
    button.textContent = 'Enter';
    button.style.backgroundColor = LIGHTGREY;
    button.onClick = () => {
      // currentAttempt += letter;
      // updateGrid();
    };
    row.appendChild(button);
  }
  for (let letter of letters) {
    let button = document.createElement('button');
    button.className = 'button';
    button.textContent = letter;
    button.style.backgroundColor = LIGHTGREY;
    button.onClick = () => {
      // currentAttempt += letter;
      // updateGrid();
    };
    row.appendChild(button);
  }
  if (isLastRow) {
    let button = document.createElement('button');
    button.className = 'button';
    button.textContent = 'Backspace';
    button.style.backgroundColor = LIGHTGREY;
    button.onClick = () => {
      // currentAttempt += letter;
      // updateGrid();
    };
    row.appendChild(button);
  }
  keyboard.appendChild(row);
}

let grid = document.getElementById('grid');
let keyboard = document.getElementById('keyboard');

buildGrid();
buildKeyboard();
updateGrid();
window.addEventListener('keydown', handleKeyDown);

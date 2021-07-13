const display = document.querySelector('.display');

const operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', operatorF);
}
const number = document.getElementsByClassName('number');
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', numberF);
}
const decimal = document.getElementById('decimal');
const ac = document.querySelector('.AC');
const minusSign = document.getElementById('minus');
ac.addEventListener('click', clearF);

let currentOp;
let priorOp;
let result;
let count = 0;
let operationKey;
let decimalCount;
let minusCount;

function numberF(event) {
  operatorKey = event.target.value;
  decimalCount = 0;
  minusCount = 0;
  if (currentOp !== '' || priorOp !== '') {
    minusSign.disabled = true;
  }
  if (event.target.value === '-') {
    minusCount++;
  }
  display.textContent += operatorKey;
  currentOp = display.textContent;
  if (event.target.value === '.') {
    if (currentOp === '.') {
      currentOp = '0' + event.target.value;
      display.textContent = currentOp;
    }
    decimalCount++;
  }
  if (decimalCount >= 1) {
    decimal.disabled = true;
  }
  if (minusCount >= 1) {
    minusSign.disabled = true;
  }
  return currentOp;
}

function operatorF() {
  decimal.disabled = false;
  minusSign.disabled = false;
  if (currentOp === '') return;
  count++;

  if (count === 1) {
    priorOp = currentOp;
    currentOp = '';
    display.textContent = '';
    operationKey = event.target.value;
    return priorOp;
  }

  if (priorOp !== '') {
    computation(currentOp, priorOp, operationKey);
    operationKey = event.target.value;
  }

  priorOp = result;
  display.textContent = '';

  if (event.target.value === '=') {
    display.innerHTML = result;
    decimal.disabled = true;
    minusSign.disabled = true;
  }
}

function computation(currentOp, priorOp, operationKey) {
  console.log(priorOp, currentOp, operationKey, 'in computation');
  if (isNaN(parseFloat(currentOp)) || isNaN(parseFloat(priorOp))) return;
  if (operationKey === '+') {
    result = parseFloat(priorOp) + parseFloat(currentOp);
    return result;
  } else if (operationKey === '-') {
    result = parseFloat(priorOp) - parseFloat(currentOp);
    return result;
  } else if (operationKey === '*') {
    result = parseFloat(priorOp) * parseFloat(currentOp);
    return result;
  } else if (operationKey === '/') {
    result = parseFloat(priorOp) / parseFloat(currentOp);
    return result;
  }
  return result;
}

function clearF() {
  display.textContent = '';
  currentOp = '';
  priorOp = '';
  result = '';
  count = 0;
  decimal.disabled = false;
}

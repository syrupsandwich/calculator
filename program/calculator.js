function add(a, b){
  return +a + +b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  return a / b;
}

//input must be a string
function operate(input){
  let operator = Array.from(`${input}`).find((a)=>(checkIfOperator(a)));
  let numbers = `${input}`.split(`${operator}`);
  if (operator == '+') { return add(numbers[0], numbers[1])};
  if (operator == '−') {return subtract(numbers[0], numbers[1])};
  if (operator == '×') {return multiply(numbers[0], numbers[1])};
  if (operator == '÷') {return divide(numbers[0], numbers[1])};
}

function checkIfOperator(a){
  return (
    a == '+' ||
    a == '−' ||
    a == '×'||
    a == '÷');
}

let results = document.querySelector('#results');
let buttons = document.querySelector('.body');

buttons.addEventListener('click', (e)=>{

  let expression = Array.from(results.textContent);
  if (checkIfOperator(e.target.textContent)
   && checkIfOperator(expression.slice(-1))){
    results.textContent = expression.slice(0, -1).join('');
    results.textContent += e.target.textContent;
    return;
  }

  if (e.target.nodeName == 'DIV'){return};
  results.textContent += e.target.textContent;
  if (results.textContent.length > 16){
    results.textContent = results.textContent.slice(1, 18);
  }
  
});

let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('dblclick', (e)=>{
  results.textContent = '';
});

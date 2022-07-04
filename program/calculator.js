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
let expression = [];

buttons.addEventListener('click', (e)=>{
  //ignore the button container
  if (e.target.nodeName == 'DIV'){return};

  expression.push(e.target.textContent);

  //if input is an operator
  //and last index is an operator
  if (checkIfOperator(e.target.textContent)
  && checkIfOperator(expression.slice(-1))){
    expression.pop();
    expression.push(e.target.textContent);
  }
  
  //if user inputs a second operator,
  //replace the first part of the expression with its solution
  if(expression.filter((a)=>checkIfOperator(a)).length == 2){
    expression = [...operate(expression.slice(0, -1).join('')) + expression.pop()];
  }
  
  //display the input
  results.textContent = expression.join('');
  
});

let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('dblclick', (e)=>{
  results.textContent = '';
});

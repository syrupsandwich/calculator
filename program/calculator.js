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
  if (operator == '+') {return add(numbers[0], numbers[1])};
  if (operator == '−') {return subtract(numbers[0], numbers[1])};
  if (operator == '×') {return multiply(numbers[0], numbers[1])};
  if (operator == '÷') {return divide(numbers[0], numbers[1])};
}

function checkIfOperator(a){
  return (
    a == '+' ||
    a == '−' ||
    a == '×' ||
    a == '÷');
}


let results = document.querySelector('#results');
let buttons = document.querySelector('.body');
let expression = [];
let term = [];

buttons.addEventListener('click', (e)=>{
  //ignore the button container
  if (e.target.nodeName == 'DIV'){return};
  
  //limit each term to have one decimal point
  if(term.some((a)=>(a == '.')) && e.target.textContent == '.'){ return };
  term.push(e.target.textContent);
  if(checkIfOperator(e.target.textContent) || e.target.textContent == '='){ term = [] };

  //clear the display after a finished calculation
  if(expression.slice(-1) == '=' && e.target.className == 'num'){expression = []};
  //allow user to work with previous value
  if(expression.slice(-1) == '=' && checkIfOperator(e.target.textContent)){expression.pop()};

  //change operator instead of repeating
  if (checkIfOperator(e.target.textContent)
  && checkIfOperator(expression.slice(-1))){
    expression.pop();
    expression.push(e.target.textContent);
    results.textContent = expression.join('');
    return;
  }

  //make equals solve a two term expression
  if(checkExpression(expression)
  && e.target.textContent == '='){
    results.textContent = [Math.round(operate(expression.join('')) * 100) / 100];
    expression = [...results.textContent + '='];
    return;
  }

  if (e.target.textContent != '='){ expression.push(e.target.textContent)};
  
  //if user inputs a second operator,
  //replace the first part of the expression with its solution
  if(expression.filter((a)=>checkIfOperator(a)).length == 2){
    expression = [...Math.round(operate(expression.slice(0, -1).join('')) * 100) / 100
    + expression.pop()];
  }
  
  //display the input
  results.textContent = expression.filter((a)=>(a != '=')).join('');
  
});

let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('dblclick', (e)=>{
  results.textContent = '';
  expression = [];
});

let backSpaceBtn = document.querySelector('#backspace');

backSpaceBtn.addEventListener('click', (e)=>{
  results.textContent = results.textContent.slice(0, -1);
  expression = Array.from(results.textContent);
  term.pop();
})

function checkExpression(array){
  let operator = array.find((a)=>(checkIfOperator(a)));
  let numbers = `${array}`.split(`${operator}`);
  if (numbers.length == 2){ return true };
}
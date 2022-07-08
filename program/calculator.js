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
  return (a == '+' || a == '−' || a == '×' || a == '÷');
}


let results = document.querySelector('#results');
let buttons = document.querySelector('.body');
let expression = [];
let term = [];

buttons.addEventListener('click', (e)=>{
  //ignore the button container
  if (e.target.nodeName == 'DIV'){return};
  storeInput(e.target.textContent);
});

let numeric = Array.from(document.querySelectorAll('.num'));

function storeInput(input){
  //limit each term to have one decimal point
  if(term.some((a)=>(a == '.')) && input == '.'){ return };
  term.push(input);
  if(checkIfOperator(input) || input == '='){ term = [] };
  
  //clear the display after a finished calculation
  if(expression.slice(-1) == '=' && numeric.some((a)=>(input == a.textContent))){expression = []};
  //allow user to work with previous value
  if(expression.slice(-1) == '=' && checkIfOperator(input)){expression.pop()};
  
  //change operator instead of repeating
  if (checkIfOperator(input)
  && checkIfOperator(expression.slice(-1))){
    expression.pop();
    expression.push(input);
    results.textContent = expression.join('');
    return;
  }
  
  //make equals solve a two term expression
  if(checkExpression(expression)
  && input == '='){
    results.textContent = [Math.round(operate(expression.join('')) * 100) / 100];
    expression = [...results.textContent + '='];
    return;
  }
  
  if (input != '='){ expression.push(input)};
  
  //if user inputs a second operator,
  //replace the first part of the expression with its solution
  if(expression.filter((a)=>checkIfOperator(a)).length == 2){
    expression = [...Math.round(operate(expression.slice(0, -1).join('')) * 100) / 100
    + expression.pop()];
  }
  
  //display the input
  results.textContent = expression.filter((a)=>(a != '=')).join('');

}

let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('dblclick', (e)=>{
  clearDisplay();
});

let backSpaceBtn = document.querySelector('#backspace');

backSpaceBtn.addEventListener('click', (e)=>{
  removeLastCharacter();
})

function checkExpression(array){
  let operator = array.find((a)=>(checkIfOperator(a)));
  let numbers = `${array}`.split(`${operator}`);
  if (numbers.length == 2){ return true };
}

let calcKeys = ['1','2','3','4','5','6','7','8','9','0','.','=','+','-','*','/',];

document.addEventListener('keydown', (e)=>{
  if(calcKeys.some((a)=>(e.key == a))){
    storeInput(`${filterInput(e.key)}`);
  }else if(e.key == 'Backspace'){
    removeLastCharacter();
  }else if(e.key == 'Enter'){
    e.preventDefault();
    storeInput('=');
  }else if(e.key == 'Escape'){
    e.preventDefault();
    clearDisplay();
    }
});

function removeLastCharacter(){
  results.textContent = results.textContent.slice(0, -1);
  expression = Array.from(results.textContent);
  term.pop();
}

function filterInput(string){
  if(string == '*'){ return '×' }
  else if(string == '/'){ return '÷' }
  else if(string == '-'){ return '−' }
  else { return string };
}

function clearDisplay(){
  results.textContent = '';
  expression = [];
}

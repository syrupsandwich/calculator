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
  let operand = Array.from(`${input}`).find((a)=>(a == '+' || a == '-' || a == '&#215;' || a == '/'));
  let numbers = `${input}`.split(`${operand}`);
  if (operand == '+') { return add(numbers[0], numbers[1])};
  if (operand == '-') {return subtract(numbers[0], numbers[1])};
  if (operand == '&#215;') {return multiply(numbers[0], numbers[1])};
  if (operand == '/') {return divide(numbers[0], numbers[1])};
}

let results = document.querySelector('#results');
let buttons = document.querySelector('.body');
buttons.addEventListener('click', (e)=>{
  if (e.target.nodeName == 'DIV'){return};
  results.textContent += e.target.textContent;
  if (results.textContent.length > 16){
    results.textContent = results.textContent.slice(1, 18);
  }
});

let clearbtn = document.querySelector('#clear');
clearbtn.addEventListener('dblclick', (e)=>{
  results.textContent = '';
});




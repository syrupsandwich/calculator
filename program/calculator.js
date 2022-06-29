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

//imput must be a string
function operate(imput){
  let operand = Array.from(`${imput}`).find((a)=>(a == '+' || a == '-' || a == '*' || a == '/'));
  // console.log(`operand: ${operand}`);
  let numbers = `${imput}`.split(`${operand}`);
  // console.log(`numbers: ${numbers}`);
  if (operand == '+') { return add(numbers[0], numbers[1])};
  if (operand == '-') {return subtract(numbers[0], numbers[1])};
  if (operand == '*') {return multiply(numbers[0], numbers[1])};
  if (operand == '/') {return divide(numbers[0], numbers[1])};
}


let results = document.querySelector('#results');
let buttons = document.querySelector('.numbers');
buttons.addEventListener('click', (e)=>{
  results.textContent += e.target.textContent;
});
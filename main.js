let shouldReset = false;
let n1 = "";
let n2 = "";
let currentOperation = null;

const cur = document.querySelector('.current-num');
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");
const deleteButton = document.querySelector(".delete-button");
const pointButton = document.querySelector(".point-button");

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendDigit(button.textContent))
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent))
})

clearButton.addEventListener('click', clear)
equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNum);

function appendDigit(x){
    if(cur.textContent=="0" || shouldReset) {
        reset();
    }
    cur.textContent += x;
}

function setOperation(x){
    if(currentOperation != null) evaluate();
    n1 = cur.textContent;
    currentOperation = x;
    shouldReset = true;
}

function evaluate(){
    if (currentOperation === null || shouldReset) return;
    if (currentOperation === '÷' && cur.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    n2 = cur.textContent;
    cur.textContent = roundNum(calc(n1, n2, currentOperation));
    currentOperation = null;
}

function reset(){
    cur.textContent = "";
    shouldReset = false;
}

function calc(a, b, operator){
    a = Number(a);
    b = Number(b);
    if(operator == "+") return a+b;
    else if(operator == "-") return a-b;
    else if (operator == "×") return a*b;
    else return a/b;
}

function roundNum(x){
    return Math.round(x*1000)/1000;
}

function clear() {
    shouldReset = false;
    n1 = "";
    n2 = "";
    currentOperation = null;
    cur.textContent="0";
}

function deleteNum() {
    cur.textContent = cur.textContent.slice(0, -1);
}
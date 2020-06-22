let result;
let input;

if (localStorage.getItem('result')) {
    result = localStorage.getItem('result');
    input = localStorage.getItem('input') || "0";
} else {
    result = "0";
    input = "0";
    setLocalStorage();
}

setHTMLOfResult();
setHTMLOfInput();

function handleOnClick(event) {
    const id = event.target.id;
    const className = event.target.className;
    if (className.includes('number')) {
        selectNumber(id);
    } else if (className.includes('operators')) {
        selectOperators(id);
    } else if (className.includes('clear')){
        selectClear(id);
    }
}

function selectOperators(id) {
    if (document.getElementById(`${id}`).className.includes('arithmetic')) {
        selectArithmetic(id);
    }
}

function selectArithmetic(id) {
    if (input.length == 1 && (input == 0 || isArithmetic(document.getElementById(`${id}`).innerHTML))) {
        input = document.getElementById(`${id}`).innerHTML;
        setHTMLOfInput();
        setLocalStorage();
    }
}

function selectNumber(numberID) {
    if (isArithmetic(input)) {
        result += ` ${input}`;
        input = numberID.toString();
        setLocalStorage();
        setHTMLOfInput();
        setHTMLOfResult();
    } else {
        input = (input == 0) ? numberID.toString() : (input + numberID.toString());
    }
    setLocalStorage();
    setHTMLOfInput();
    setHTMLOfResult();
}

function isArithmetic(item) {
    switch(item) {
        case "+":
        case "-":
        case "%":
        case "×":
        case "÷":
            return true;
    }
    return false;
}

function selectClear(clearID) {
    if(clearID == 'backspace') {
        handleOnBackspace();
    } else {
        handleOnClearAll();
    }
}

function handleOnBackspace() {
    const lastCharactersCode = input.charCodeAt(input.length - 1);
    if (lastCharactersCode >= 48 && lastCharactersCode <= 57) {
        clearDigit(lastCharactersCode);
    }
    //Udalenie arithmetic operatora s resulta posle dobavlenie arithmetica
}

function handleOnClearAll() {
    result = "0";
    input = "0";
    setLocalStorage();
    setHTMLOfInput();
    setHTMLOfResult();
}

function clearDigit() {
    input = (input.length > 1) ? input.substring(0, input.length - 1) : "0";
    localStorage.setItem('input', input);
    setHTMLOfInput();
}

function setLocalStorage() {
    localStorage.setItem('result', result);
    localStorage.setItem('input', input);
}

function setHTMLOfInput() {
    document.querySelector('.input').innerHTML = input;
}

function setHTMLOfResult() {
    document.querySelector('.result').innerHTML = "Ans = " + result;
}

document.addEventListener('click', handleOnClick);

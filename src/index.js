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
    } else if (id == 'equals') {
        equals();
    } else if (id == 'point') {
        selectDecimal();
    }
}

function selectDecimal() {
    if (!hasPoint()) {
        input += '.';
        setLocalStorage();
        setHTMLOfInput();
    }
}

function hasPoint() {
    for (let i = 0; i < input.length; ++i) {
        if (input.charAt(i) == '.') return true;
    }
    return false;
}

function equals() {
    const arithmetic = result.charAt(result.length - 1);
    if (isArithmetic(arithmetic)) {
        switch(arithmetic) {
            case '+':
                doAddition();
                break;
            case '-':
                doSubtraction();
                break;
            case '×':
                doMultiplication();
                break;
            case '÷':
                doDivision();
                break;
            case '%':
                doPercentage();
        }
    }
}

function doAddition() {
    result = parseInt(result) + parseInt(input);
    input = "0";
    setLocalAndHTML();
}

function doSubtraction() {
    result = parseInt(result) - parseInt(input);
    input = "0";
    setLocalAndHTML();
}

function doMultiplication() {
    result = parseInt(result) * parseInt(input);
    input = "0";
    setLocalAndHTML();
}

function doDivision() {
    result = parseInt(result) / parseInt(input);
    input = "0";
    setLocalAndHTML();
}

function doPercentage() {
    result = (parseInt(result) * parseInt(input)) / 100;
    input = "0";
    setLocalAndHTML();
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
    } else {
        input = (input == 0 && input.charAt(input.length - 1) != '.') ? numberID.toString() : (input + numberID.toString());
    }
    setLocalAndHTML();
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
    } else if(lastCharactersCode == 46) {
        input = input.substring(0, input.length - 1);
        localStorage.setItem('input', input);
        setHTMLOfInput();
    }
}

function handleOnClearAll() {
    result = "0";
    input = "0";
    setLocalAndHTML();
}

function clearDigit() {
    input = (input.length > 1) ? input.substring(0, input.length - 1) : "0";
    localStorage.setItem('input', input);
    setHTMLOfInput();
}

function setLocalAndHTML() {
    setLocalStorage();
    setHTMLOfInput();
    setHTMLOfResult();
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


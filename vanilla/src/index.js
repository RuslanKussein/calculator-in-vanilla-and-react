let result;
let input;

if (localStorage.getItem('result')) {
    result = localStorage.getItem('result');
    input = localStorage.getItem('input') || "0";
} else {
    result = "";
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
        //do something
    } else if (className.includes('clear')){
        selectClear(id);
    }
}

function selectNumber(numberID) {
    input = (input == 0) ? numberID.toString() : (input + numberID.toString());
    document.querySelector('.input').innerHTML = input;
    localStorage.setItem('input', input);
}

function selectClear(clearID) {
    if(clearID == 'backspace') {
        handleOnBackspace();
    } else {
        //handleOnClearAll();
    }
}

function handleOnBackspace() {
    const lastCharactersCode = input.charCodeAt(input.length - 1)
    if (lastCharactersCode >= 48 && lastCharactersCode <= 57) {
        clearDigit(lastCharactersCode);
    }
}

function clearDigit() {
    input = (input.length > 1) ? input.substring(0, input.length - 1) : "0";
    localStorage.setItem('input', input);
    document.querySelector('.input').innerHTML = input;
}


document.addEventListener('click', handleOnClick);

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
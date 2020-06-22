let result;
let input;

if (localStorage.getItem('result')) {
    result = "Ans = " + localStorage.getItem('result');
    input = localStorage.getItem('input') || "0";
} else {
    result = "";
    input = "0";
    localStorage.setItem('result', result);
    localStorage.setItem('input', input);
}

document.querySelector('.result').innerHTML = result;
document.querySelector('.input').innerHTML = input;

function handleOnClick(event) {
    const id = event.target.id;
    const className = event.target.className;
    if (className.includes('number')) {
        typeNumber(id);
    } else if (className.includes('operators')) {
        //do something
    } else if (className.includes('clear')){
        //do something
    }
}

document.addEventListener('click', handleOnClick);


function typeNumber(number) {
    if (!(+input)) {
        input = number.toString();
    } else {
        input += number.toString();
    }
    document.querySelector('.input').innerHTML = input;
    localStorage.setItem('input', input);
}


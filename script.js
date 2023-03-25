let runningTotal = 0;
let buffer = "0";   // temporarily stores the value as string
let prevOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)) handleSymbol(value);
    else handleNum(value);
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(prevOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            prevOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0,buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            prevOperator = symbol;
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0') return;

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(symbol);
    }
    buffer = '0';
}

function flushOperation(intBuffer){
    switch(prevOperator){
        case '+': runningTotal += intBuffer; break;
        case '−': runningTotal -= intBuffer; break;
        case '×': runningTotal *= intBuffer; break;
        case '÷': runningTotal /= intBuffer; break;
    }
}

function handleNum(numString){
    if(buffer === '0'){
        buffer = numString;
    }
    else{
        buffer += numString;
    }
}

function init(){
    document.querySelector('.calcbuttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}

init();

const displayInputEl = document.getElementById('input-display');
const buttonEls = document.querySelectorAll('.btn');

const operators = ['+', '-', '*', '/'] ;
let justEvaluated = true


function displayInput(event){
    const buttonValue = event.target.value;
    const lastChar = getLastChar()

    // Clear function
    if(buttonValue === ""){
        displayInputEl.value = '0';
        justEvaluated = false;
        return
    }

    // operator functions
    if(operators.includes(buttonValue)){
        if(justEvaluated){
            justEvaluated = false;
            displayInputEl.value += buttonValue
            return;
        }

        if(displayInputEl.value === '0')return;

        if(operators.includes(lastChar)){
            displayInputEl.value = displayInputEl.value.slice(0, -1) + buttonValue;
            return;
        }

        displayInputEl.value += buttonValue;
    }

    // Decimal point .
    if(buttonValue === "."){
        if(justEvaluated){
            displayInputEl.value = '0.';
            justEvaluated = false;
            return;
        }

        const currentNumber = getCurrentNumber();
        if(currentNumber.includes('.'))return;

        if(operators.includes(lastChar)){
            displayInputEl.value += '0.';
            return;
        }

        if(displayInputEl.value === '0'){
            displayInputEl.value += '.';
            return;
        }  
    }

    // Equal function
    if(buttonValue === '='){
        if(operators.includes(lastChar)){
            displayInputEl.value = displayInputEl.value.slice(0, -1);
            return;
        }

        try{
            displayInputEl.value = eval(displayInputEl.value)
        }catch(error) {
            displayInputEl.value = "Error"
        }
        justEvaluated = true;
        return;
    }

    // Delete button
    if(buttonValue === 'D'){
        if(displayInputEl.value === ''){
            displayInputEl.value = '0';
            justEvaluated = false;
            return;
        }else{
            displayInputEl.value = displayInputEl.value.slice(0, -1);
            justEvaluated = false;
            return;
        }
    }


    // Display value of button clicked
    if(!operators.includes(buttonValue) && buttonValue !== '=' && buttonValue !== '.'){
        if(justEvaluated){
            displayInputEl.value = buttonValue;
            justEvaluated = false;
            return;
        }
        if(displayInputEl.value === '0'){
            displayInputEl.value = buttonValue;
        }else{
            displayInputEl.value += buttonValue;
        }
    }
    
}

function getLastChar(){
    return displayInputEl.value.slice(-1);
}

function getCurrentNumber(){
    const parts = displayInputEl.value.split(/[\+\-\*\/]/) 
    return parts[parts.length -1]
}


buttonEls.forEach(function(buttonEl){
    buttonEl.addEventListener('click', displayInput)
})



document.addEventListener('keydown', (event) =>{
    const key = event.key;

    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace'];

    if(!allowedKeys.includes(key))return;

    let mappedValue = key;

    if(key === 'Enter') mappedValue = '=';
    if(key === 'Backspace') mappedValue = 'D';
        
    const fakeEvent = {
        target: {
            value: mappedValue
        }
    };

    displayInput(fakeEvent)

})
















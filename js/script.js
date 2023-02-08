const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    //addDigit to calculator screen
    addDigit(digit) {
        //check if current operations already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            alert("Entrada inválida, só é possivel uma unica divisão de casa")
            return;
        }
        this.currentOperation = digit
        this.updateScreen();
    }


    //Process all calculator operations
    processOperation(operation) {
        //check if current value is empty
        if (this.currentOperationText.innerText === "" && operation != "C") {
            //change Operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return;
        }

        //Get current and previous value
        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;


        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:

                return;
        }
    }

    //change values of caculator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        if (operationValue == null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            //check if value is 0, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = ""
        }
    }

    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"];
        if (!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }

    processDelOperator() {
        //delete the last digit
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    processClearCurrentOperator() {
        //clear current Operation
        this.currentOperationText.innerText = "";
    }

    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}


const calc = new Calculator(previousOperationText, currentOperationText);

/*para cada botao, sera adicionado um listener que irá esperar um evento de click,
 quando ocorrer, será criada uma const "value" que irá receber o texto interno daquele botão
*/
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
})
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText

        this.currentOperation = ""
    }

    // Adiciona digitos no visor da calculadora
    addDigit(digit) {
        // Verifica se a operação atual já contém um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    // Processa todas as operações da calculadora
    processOperation(operation) {
        // obtem valores atuais e valores anteriores
        let operationValue
        let previous = +this.previousOperationText.innerText;
        let current = +this.currentOperationText.innerText;

        switch(operation){  // Fiquei AQUI 
            case "+" :
                break;
            default:
                return;
        }
    }

    //Muda os valores no visor da calculadora
    updateScreen() {
        this.currentOperationText.innerText += this.currentOperation; 
    }
}

const calc = new Calculator(previousOperationText, currentOperationText); // Intancia do objeto

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else{
            calc.processOperation(value);
        }
        
    })
});
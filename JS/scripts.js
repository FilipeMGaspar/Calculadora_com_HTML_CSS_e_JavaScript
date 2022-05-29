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
        // Verifica se o valor atual está vasio
        if(this.currentOperationText.innerText === "") {
             // Muda a operação
            if(this.previousOperationText.innerText !== "") {
               this.changeOperation(operation);
            }
            return;
        }
        // obtem valores atuais e valores anteriores
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){  // Fiquei AQUI 
            case "+" :
                    operationValue = previous + current
                    this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-" :
                    operationValue = previous - current
                    this.updateScreen(operationValue, operation, current, previous)
                break;    
            case "*" :
                    operationValue = previous * current
                    this.updateScreen(operationValue, operation, current, previous)
                break; 
            case "/" :
                    operationValue = previous / current
                    this.updateScreen(operationValue, operation, current, previous)
                break;   
            case "DEL" :
                   this.processDelOperator();
                break;  
            case "CE" :
                    this.processDelOperator();
                 break;   
            default:
                return;
        }
    }

    //Muda os valores no visor da calculadora
    updateScreen(operationValue = null, operation=null, current = null, previous = null) {
        
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            // Verfifcando se o valor é 0, se for soma apenas o valor atual
            if(previous === 0){
                operationValue = current
            }

            // Adicionando o valor atual ao valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
         
    }

    // Muda a operação matemática
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return
        } 

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Apaga o ultimo digito 
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
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
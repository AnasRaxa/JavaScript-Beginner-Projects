const inputElement = document.querySelector("#equation")
const form = document.querySelector("#equation-form")
const resultsElement = document.querySelector("#results")

const PARENTHESIS_REGIX = /\((?<equation>[^\(\)]*)\)/
const MULTIPLY_DEVIDE_REGEX = /(?<operand1>\S+)\s*(?<operation>[\*\/])\s*(?<operand2>\S+)/
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/
const ADD_SUBTRACT_REGEX = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/


form.addEventListener("click", (e) =>{
    e.preventDefault()
    const result = parse(inputElement.value)
    resultsElement.textContent = result

})


function parse(equation){
    if(equation.match(PARENTHESIS_REGIX)){
        const subEqu = equation.match(PARENTHESIS_REGIX).groups.equation
        const result = parse(subEqu)
        const newEqu = equation.replace(PARENTHESIS_REGIX,result)
        return parse(newEqu)

    }else if(equation.match(EXPONENT_REGEX)){
        const result = handleMath(equation.match(EXPONENT_REGEX).groups)
        const newEqu = equation.replace(EXPONENT_REGEX,result)
        return parse(newEqu)
    }else if(equation.match(MULTIPLY_DEVIDE_REGEX)){
        const result = handleMath(equation.match(MULTIPLY_DEVIDE_REGEX).groups)
        const newEqu = equation.replace(MULTIPLY_DEVIDE_REGEX,result)
        return parse(newEqu)
    }else if(equation.match(ADD_SUBTRACT_REGEX)){
        const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
        const newEqu = equation.replace(ADD_SUBTRACT_REGEX,result)
        return parse(newEqu)
    }
    else{
        return parseFloat(equation)
    }
}


function handleMath({operand1, operation, operand2}){
    const number1 = parseFloat(operand1)
    const number2 = parseFloat(operand2)
    
    switch(operation){
        case "*":
            return number1 * number2
        case "/":
            return number1 / number2
        case "+":
            return number1 + number2
        case "-":
            return number1 - number2
        case "^":
            return number1 ** number2
    }

}
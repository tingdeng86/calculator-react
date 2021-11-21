import { useState } from "react"
import Button from "./Button";

function Display() {
    const [displayValue, setDisplayValue] = useState("0");
    const [firstNum, setFirstNum] = useState(0);
    const [operator, setOperator] = useState(null);
    const [isSecondNum, setIsSecondNum] = useState(false);
    const [memory, setMemory] = useState(0);
    const [showMemory, setShowMemory] = useState(false)

    function inputDigit(digit) {
        let newValue;
        if (showMemory === true) {
            newValue = digit;
            setShowMemory(false)
            setIsSecondNum(false)
        } else if (isSecondNum === false) {
            if (displayValue == "0") {
                newValue = digit;
            } else {
                newValue = displayValue + digit
            }

        } else {
            newValue = digit;
            setIsSecondNum(false)
        }
        console.log(newValue);
        setDisplayValue(newValue);
    }

    function handleDecimal(dot) {
        if (isSecondNum === true) {
            let newDisplay = "0."
            setDisplayValue(newDisplay)
            setIsSecondNum(false)

        } else {
            if (displayValue.includes(dot)) {
                setDisplayValue(displayValue)
            } else {
                setDisplayValue(displayValue + dot)
            }
        }
    }
    function resetAll() {
        setDisplayValue("0");
        setIsSecondNum(false);
        setOperator(null);
        setFirstNum(0);
    }
    function clearCurrentDisplay() {
        setDisplayValue("0");
    }

    function handleOperator(newOperator) {
        let newNum = parseFloat(displayValue)
        if (firstNum === 0 && !isNaN(newNum)) {
            setFirstNum(newNum)

        } else if (operator) {
            let result = handleEqual(firstNum, operator, newNum)
            console.log(operator)
            setFirstNum(result)
            setDisplayValue(result.toString())
        }
        setOperator(newOperator)
        setIsSecondNum(true)

    }
    function handlePercent() {
        let newNum = parseFloat(displayValue);
        let result = newNum / 100;
        setDisplayValue(result.toString())
    }
    function handleSquareRoot() {
        let newNum = parseFloat(displayValue);
        if (newNum > 0) {
            let result = Math.sqrt(newNum)
            setDisplayValue(result.toString())
        }

    }
    function converseNum() {
        let newNum = parseFloat(displayValue);
            let result = newNum * (-1);
            setDisplayValue(result.toString())
    }
    function saveMemory() {
        let newNum = parseFloat(displayValue);
        setMemory(newNum)
    }
    function recallMemory() {
        setDisplayValue(memory.toString())
        setShowMemory(true);
    }
    function clearMemory() {

        setMemory(0);

    }
    function plusMemory() {
        let newNum = parseFloat(displayValue) + memory;
        setMemory(newNum)
    }
    function minusMemory() {
        let newNum = memory - parseFloat(displayValue);
        setMemory(newNum)
    }

    function handleEqual(firstNum, operator, secondNum) {
        let result
        if (operator === "Add") {
            result = firstNum + secondNum
        } else if (operator === "Subtract") {
            result = firstNum - secondNum
        } else if (operator === "Multiply") {
            result = firstNum * secondNum
        } else if (operator === "Divide") {
            if(secondNum!==0){
                result = firstNum / secondNum
            }else{
                result = 0
            }           
        } 
        else {
            return firstNum
        }
        return result;
    }

    function passValue(value) {
        switch (value) {
            case "Add":
            case "Subtract":
            case "Multiply":
            case "Divide":
            case "Equal":
                handleOperator(value);
                break;
            case "Percent":
                handlePercent();
                break;
            case "Square Root":
                handleSquareRoot();
                break;
            case "All Clear":
                resetAll();
                break;
            case "Clear":
                clearCurrentDisplay();
                break;
            case ".":
                handleDecimal(value);
                break;
            case "+/-":
                converseNum();
                break;
            case "Memory Save":
                saveMemory();
                break;
            case "Memory Recall":
                recallMemory();
                break;
            case "Memory Clear":
                clearMemory();
                break;
            case "Memory Addition":
                plusMemory();
                break;
            case "Memory Subtract":
                minusMemory();
                break;
            default:
                inputDigit(value)
        }
    }

    return (
        <>
            <input type="text" className="calculatorScreen" value={displayValue} disabled />
            <Button passValue={passValue} />
        </>
    )
}

export default Display

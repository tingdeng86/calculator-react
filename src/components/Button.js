import { calculatorButtons } from "../globals/calculator-button-data"


function Button({ passValue }) {

    function handleClick(e) {
        let value = e.target.value
        passValue(value)
    }

    return (
        <div className="calculatorKeys">
            {calculatorButtons.map((item, i) =>
                <button key={i} type={item.type} className={item.className} value={item.value} onClick={handleClick}>{item.text}</button>
            )}
        </div>
    )
}

export default Button

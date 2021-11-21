import { calculatorButtons } from "../globals/calculator-button-data"
import { useState } from "react";

function Button({ passValue }) {

    function click(e) {
        let value = e.target.value
        passValue(value)
    }

    return (
        <div className="calculatorKeys">
            {calculatorButtons.map((item, i) =>
                <button key={i} type={item.type} className={item.className} value={item.value} onClick={click}>{item.text}</button>
            )}
        </div>
    )
}

export default Button

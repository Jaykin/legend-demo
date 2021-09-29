import React, { Component } from 'react'

const Keypad = ({onKeypad}) => {
    const numeric = digit => (<td className={`digit-${digit}`} onClick={ () => onKeypad(digit) }>{ digit }</td>);
    const operator = (operator, name) => (<td className={`operator operator-${name}`} onClick={ () => onKeypad(operator) }>{ operator }</td>)

    return (
        <table>
            <tbody>
                <tr>
                    { numeric(7) }
                    { numeric(8) }
                    { numeric(9) }
                    { operator('/', 'divide') }
                </tr>
                <tr>
                    { numeric(4) }
                    { numeric(5) }
                    { numeric(6) }
                    { operator('*', 'multiply') }
                </tr>
                <tr>
                    { numeric(1) }
                    { numeric(2) }
                    { numeric(3) }
                    { operator('-', 'subtract') }
                </tr>
                <tr>
                    <td></td>
                    { numeric('0') }
                    { operator('+', 'plus') }
                    { operator('=', 'equals') }
                </tr>
            </tbody>
        </table>
    )
}

export default Keypad
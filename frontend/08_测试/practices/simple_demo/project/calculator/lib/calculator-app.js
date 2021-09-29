import React, { Component } from 'react'
import Display from './display'
import Keypad from './keypad'
import calculator from './calculator'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calculator: calculator.initialState
        }
    }

    handleKeypad(key) {
        this.setState({
            calculator: calculator.nextState(this.state.calculator, key)
        })
    }

    render() {
        const { display } = this.state.calculator;

        return (
            <div>
                <Display display={ display } />
                <Keypad onKeypad={ this.handleKeypad.bind(this) } />
            </div>
        )
    }
}

export default App
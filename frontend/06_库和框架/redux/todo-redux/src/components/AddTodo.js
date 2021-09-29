/**
 * Created by Administrator on 2017/2/9.
 */
import React, { Component, PropTypes } from 'react';

export class AddTodo extends Component {
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    ref="input"
                    placeholder="What needs to be done?"
                    autoFocus={true}
                    onKeyDown={(e) => this.handleInput(e.keyCode)}/>
            </header>
        )
    }

    handleInput(keyCode) {
        if (keyCode !== 13) return true;
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddTodo(text);
        node.value = '';
    }
}

AddTodo.propTypes = {
    onAddTodo: PropTypes.func.isRequired
}


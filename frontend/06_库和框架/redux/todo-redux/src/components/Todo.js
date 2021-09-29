/**
 * Created by Administrator on 2017/2/9.
 */

import React, { Component, PropTypes } from 'react';

export class Todo extends Component {
    handleTodoStatuChange(e) {
        this.props.onTodoStatuChanged();
    }

    handleDeleteTodo() {
        this.props.onTodoDeleted();
    }

    handleToggleTodo(todoShow) {
        // 编辑todo
        const todoshowNode = this.refs.todoshow;
        const todoeditNode = this.refs.todoedit;
        todoshowNode.style.display = todoShow ? 'block' : 'none';
        todoeditNode.style.display = todoShow ? 'none' : 'block';
    }

    handleCompleteEdit(keyCode) {
        if (keyCode !== 13) return true;
        const text = this.refs.todoedit.value;
        this.handleToggleTodo(true);
        this.props.onTodoEdited(text);
    }

    render() {
        return (
            <li className={this.props.completed ? "completed" : ""}>
                <div className="view" ref="todoshow">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.completed ? true : false}
                        onChange={(e) => this.handleTodoStatuChange(e)} />
                    <label onDoubleClick={() => this.handleToggleTodo(false)}>{this.props.text}</label>
                    <button
                        className="destroy"
                        onClick={() => this.handleDeleteTodo()}>
                    </button>
                </div>
                <input
                    className="edit"
                    defaultValue={this.props.text}
                    ref="todoedit"
                    onKeyDown={(e) => this.handleCompleteEdit(e.keyCode)}
                    />
            </li>
        )
    }
}

Todo.propTypes = {
    onTodoStatuChanged: PropTypes.func.isRequired,
    onTodoDeleted: PropTypes.func.isRequired,
    onTodoEdited: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}


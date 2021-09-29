/**
 * Created by Administrator on 2017/2/9.
 */

import React, { Component, PropTypes } from 'react';

import { Todo } from './Todo';

export class TodoList extends Component {
    render() {
        let todos = this.props.todos;
        const checked = todos.length ? todos.every(todo => todo.completed) : false;
        return (
            <section className="main">
                <input
                    className="toggle-all"
                    type="checkbox"
                    checked={checked}
                    onChange={() => this.props.onCompleteAll()}/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {this.props.todos.map((todo, index) =>
                            <Todo
                                {...todo}
                                key={index}
                                onTodoStatuChanged={() => this.props.onTodoStatuChanged(index)}
                                onTodoDeleted={() => this.props.onTodoDeleted(index)}
                                onTodoEdited={(text) => this.props.onTodoEdited(index, text)}
                                />
                    )}
                </ul>
            </section>
        )
    }
}

TodoList.propTypes = {
    onTodoStatuChanged: PropTypes.func.isRequired,
    onTodoDeleted: PropTypes.func.isRequired,
    onCompleteAll: PropTypes.func.isRequired,
    onTodoEdited: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}
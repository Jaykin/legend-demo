/**
 * Created by Administrator on 2017/2/9.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { AddTodo } from '../components/AddTodo';
import { TodoList } from '../components/TodoList';
import { Footer } from '../components/Footer';

import { addTodo, changeTodoStatu, deleteTodo, clearCompleted, completeAll, editTodo, setVisibilityFilter } from '../actions/actions';
import * as filters from '../constants/TodoFilters';

class App extends Component {
    render() {
        const { dispatch, todos, filter } = this.props;
        return (
            <div>
                <AddTodo onAddTodo={text => dispatch(addTodo(text))} />
                <TodoList
                    todos={todos}
                    onTodoStatuChanged={index => dispatch(changeTodoStatu(index))}
                    onTodoDeleted={index => dispatch(deleteTodo(index))}
                    onCompleteAll={() => dispatch(completeAll())}
                    onTodoEdited={(index, text) => dispatch(editTodo(index, text))}
                    />
                <Footer
                    filter={filter}
                    todosCount={todos.length}
                    onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}
                    onClearCompleted={() => dispatch(clearCompleted())}
                    />
            </div>
        )
    }
}

App.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired,
    filter: PropTypes.oneOf([filters.SHOW_ALL, filters.SHOW_COMPLETED, filters.SHOW_ACTIVE])
}

function filterTodos(todos, filter) {
    switch(filter) {
        case filters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case filters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        case filters.SHOW_ALL:
        default :
            return todos;
    }
}

function mapStateToProps(state, ownProps) {
    console.dir(ownProps);      // 即父组件传过来的props
    console.dir(state);
    const filter = ownProps.params.filter || filters.SHOW_ALL;
    //state.filter = filter;
    return {
        //todos: filterTodos(state.todos, state.filter),
        todos: filterTodos(state.todos, filter),
        filter: filter
    }
}

export default connect(mapStateToProps)(App);
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

import { makeGetVisibleTodos } from '../selectors/index.js'


const makeMapStateToProps = () => {
    const getVisibleTodos = makeGetVisibleTodos();
    const mapStateToProp = (state, props) => {
        return {
            todos: getVisibleTodos(state, props)
        }
    }
    return mapStateToProp;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    makeMapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList
/**
 * Created by Administrator on 2017/2/9.
 */
import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/TodoFilters';


// 合并reducers
function todos(todos = [], action = null) {
    // 处理todo
    switch(action.type) {
        case types.ADD_TODO:
            return [
                ...todos,
                { text: action.text, completed: false }
            ];
        case types.CHANGE_TODO_STATU:
            return todos.map((todo, index) => index === action.index ? Object.assign(todo, { completed: !todo.completed }) : todo);
        case types.DELETE_TODO:
            return [
                ...todos.slice(0, action.index),
                ...todos.slice(action.index + 1)
            ]
        case types.CLEAR_COMPLETED:
            return todos.filter(todo => !todo.completed);
        case types.COMPLETE_ALL:
            const allMarked = todos.every(todo => todo.completed);
            return todos.map(todo => Object.assign(todo, { completed: !allMarked }));
        case types.EDIT_TODO:
            return todos.map((todo, index) => index === action.index ? Object.assign(todo, { text: action.text }) : todo);
        default :
            return todos;
    }
}

function filter(filter = SHOW_ALL, action = null) {
    // 处理过滤条件
    switch(action.type) {
        case types.SET_VISIBILITY_FILTER:
            return action.filter;
        default :
            return filter;
    }
}

export const todoApp = combineReducers({
    todos,
    filter
});


//export function todoApp(state = {}, action = null) {
//    return {
//        todos: todos(state.todos, action),
//        filter: filter(state.filter, action)
//    }
//}


/*
* state的数据结构
*   {
*       todos:[
*           { text:'string', completed:false }
*       ]
*       filter:'string'
*   }
* */
//const initState = {
//    todos: [],
//    filter: SHOW_ALL
//}
//
//export function todoApp(state = initState, action = null) {
//    switch(action.type) {
//        case ADD_TODO:
//            return Object.assign({}, {
//                todos: [
//                    ...state.todos,
//                    { text: action.text, completed: false }
//                ],
//                filter: state.filter
//            });
//        case COMPLETE_TODO:
//            return Object.assign({}, {
//                todos: [
//                    ...state.todos.slice(0, action.index),
//                    Object.assign({}, state.todos[action.index], { completed: true }),
//                    ...state.todos.slice(action.index + 1)
//                ],
//                filter: state.filter
//            });
//        case SET_VISIBILITY_FILTER:
//            return Object.assign({}, {
//                todos: state.todos,
//                filter: action.filter
//            });
//        default:
//            return state;           // 默认返回原state
//    }
//}
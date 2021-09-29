/**
 * Created by Administrator on 2017/2/9.
 */

/*
* action 类型
* */

import * as types from '../constants/ActionTypes';

/*
* action 创建函数
* */

export const addTodo = text => ({ type: types.ADD_TODO, text: text });
export const changeTodoStatu = index => ({ type: types.CHANGE_TODO_STATU, index: index });
export const deleteTodo = index => ({ type: types.DELETE_TODO, index: index });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const completeAll = () => ({ type: types.COMPLETE_ALL });
export const editTodo = (index, text) => ({ type: types.EDIT_TODO, index: index, text: text });

export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter });

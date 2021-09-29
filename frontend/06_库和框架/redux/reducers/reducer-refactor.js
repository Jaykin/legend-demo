

    // 函数分解 + reducer组合 = 重构reducer

    const initialState = {
        visibilityFilter : 'SHOW_ALL',
        todos : []
    };


    // 初始reducer
    function appReducer(state = initialState, action = null) {
        switch(action.type) {
            case 'SET_VISIBILITY_FILTER' : {
                return Object.assign({}, state, {
                    visibilityFilter : action.filter
                });
            }
            case 'ADD_TODO' : {
                return Object.assign({}, state, {
                    todos : state.todos.concat({
                        id: action.id,
                        text: action.text,
                        completed: false
                    })
                });
            }
            case 'TOGGLE_TODO' : {
                return Object.assign({}, state, {
                    todos : state.todos.map(todo => {
                        if (todo.id !== action.id) {
                            return todo;
                        }

                        return Object.assign({}, todo, {
                            completed : !todo.completed
                        })
                    })
                });
            }
            case 'EDIT_TODO' : {
                return Object.assign({}, state, {
                    todos : state.todos.map(todo => {
                        if (todo.id !== action.id) {
                            return todo;
                        }

                        return Object.assign({}, todo, {
                            text : action.text
                        })
                    })
                });
            }
            default : return state;
        }
    }



    // 提取工具函数
    function updateObject(oldObject, newValues) {
        // 更新对象
        return Object.assign({}, oldObject, newValues)
    }
    function updateItemInArray(array, itemId, callback) {
        // 更新数组中符合某条件的元素
        return array.map(item => {
            if (item.id !== itemId) return item;

            return callback(item);
        })
    }

    function appReducer(state = initialState, action = null) {
        switch(action.type) {
            case 'SET_VISIBILITY_FILTER' : return setVisibilityFilter(state, action);
            case 'ADD_TODO' : return addTodo(state, action);
            case 'TOGGLE_TODO' : return toggleTodo(state, action);
            case 'EDIT_TODO' : return editTodo(state, action);
            default : return state;
        }
    }


    // 提取case reducer
    function addTodo(todos, action) {
        return updateObject(state, {
            todos : state.todos.concat({
                id: action.id,
                text: action.text,
                completed: false
            })
        })
    }
    function toggleTodo(todos, action) {
        const newTodos = updateItemInArray(state.todos, action.id, todo => {
            return updateObject(todo, { completed : !todo.completed })
        })
        return updateObject(state, { todos : newTodos });
    }
    function editTodo(todos, action) {
        const newTodos = updateItemInArray(state.todos, action.id, todo => {
            return updateObject(todo, { text : action.text })
        })
        return updateObject(state, { todos : newTodos });
    }
    function setVisibilityFilter(visibilityFilter, action) {
        return updateObject(state, { visibilityFilter : action.filter })
    }



    // 提取slice reducer
    function todosReducer(todos = [], action = null) {
        switch(action.type) {
            case 'ADD_TODO' : return addTodo(todos, action);
            case 'TOGGLE_TODO' : return toggleTodo(todos, action);
            case 'EDIT_TODO' : return editTodo(todos, action);
            default : return todos;
        }
    }

    function visibilityReducer(visibilityFilter = 'SHOW_ALL', action = null) {
        switch(action.type) {
            case 'SET_VISIBILITY_FILTER' : return setVisibilityFilter(visibilityFilter, action);
            default : return visibilityFilter;
        }
    }

    function appReducer(state = initialState, action = null) {
        return {
            todos : todosReducer(state.todos, action),
            visibilityFilter : visibilityReducer(state.visibilityFilter, action)
        };
    }

    export default appReducer;

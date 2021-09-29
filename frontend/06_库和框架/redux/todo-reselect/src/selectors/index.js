import { createSelector } from 'reselect';

const getVisibilityFilter = (state, props) => state.todoLists[props.listId].visibilityFilter
const getTodos = (state, props) => state.todoLists[props.listId].todos
// 进一步使用keyword进行过滤
const getKeyword = (state, props) => state.todoLists[props.listId].keyword;


const getVisibleTodos = createSelector(
    [ getVisibilityFilter, getTodos ],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return todos
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed)
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed)
        }
    }
)

export const makeGetVisibleTodos = () => {
    return createSelector(
        [getVisibleTodos, getKeyword],
        (visibleTodos, keyword) => visibleTodos.filter(
            todo => todo.text.indexOf(keyword) > -1
        )
    )
}



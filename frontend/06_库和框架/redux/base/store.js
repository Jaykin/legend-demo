import { createStore } from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';


    // 1.0 根据reducer来创建store
let store = createStore(todoApp);

    // 2.0 发起action
console.log(store.getState());      // 获取state初始状态
    // 每次 state 更新时，打印日志
    // 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
        console.log(store.getState())
);

store.dispatch(addTodo('学习actions'));
store.dispatch(addTodo('学习reducers'));
store.dispatch(addTodo('学习store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// 停止监听 state 更新
unsubscribe();

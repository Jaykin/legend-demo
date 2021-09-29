
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import EditableTable from './EditableTable';

const preloadState = {
    list: [],

    isFetching: false,

    refresh: false,             // 重新加载当前页

    visible: false,

    isCreating: false,

    pager: {
        showQuickJumper: true,
        current: 1,
        pageSize: 10,
        total:0
    }
}

const store = createStore(rootReducer, preloadState, applyMiddleware(thunk));

class SecManage extends Component {
    render() {
        return (
            <Provider store={store}>
                <EditableTable pageSize={10} />
            </Provider>
        )
    }
}

export default SecManage;


import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import RowMergeTable from './children/RowMergeTable';
import TypeEditModal from './children/TypeEditModal';

const preloadState = {
    curType: null,              // 当前编辑的类型数据

    updateTypeData: {           // 编辑类型信息后传给后台的数据结构
        del: [],
        new: [],
        update: []
    },

    refresh: false,             // 是否重新加载当前页

    visible: false,             // 标示modal显示或隐藏

    isUpdating: false              // 标示请求后台更新分类信息时的loading状态
}

const store = createStore(rootReducer, preloadState, applyMiddleware(thunk));

class TypeManage extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <RowMergeTable pageSize={10} />
                    <TypeEditModal />
                </div>
            </Provider>
        )
    }
}

export default TypeManage;

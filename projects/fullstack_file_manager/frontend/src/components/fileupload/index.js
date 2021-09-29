
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Main from './children/Main';
import rootReducer from './reducers';

/**
 * fileupload模块的state结构
*/
const preloadState = {
    // 域数据
    filelist: [],

    // 状态数据
    selectedRowKeys: []
}

class FileUpload extends Component {
    constructor(props) {
        super(props);
        // 用来子应用隔离
        this.store = createStore(rootReducer, preloadState);
    }

    render() {
        return (
            <Provider store={this.store}>
                <Main />
            </Provider>
        )
    }
}

export default FileUpload;

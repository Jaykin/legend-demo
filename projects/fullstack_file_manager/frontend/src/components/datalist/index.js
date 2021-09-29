
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Link } from 'react-router';

import { HorizontalForm } from '../form';
import FileList from '../filelist';

import './datalist.css';

import { backDataMapToFormData } from '../_utils/formData';      // 表单初始化需要的数据
import rootReducer from './reducer';

/**
 * datalist模块的state结构
*/
const preloadState = {
    formData: {}               // 搜索文件时的表单最终数据
}
const initFormData = backDataMapToFormData();
const allItem = initFormData.allItem;

// 文件上传按钮组件
const FileUploadBtn = () => (
    <div style={{position:'absolute',right:40,top:0,fontSize:14}}>
        <div className="ant-btn ant-btn-primary" style={{lineHeight: '26px'}}>
            <Link to="/fileupload">文件上传</Link>
        </div>
    </div>
);

class DataList extends Component {
    constructor(props) {
        super(props);
        // 用来子应用隔离
        this.store = createStore(rootReducer, preloadState);
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <FileUploadBtn />
                    <HorizontalForm { ...initFormData } />
                    <FileList pageSize={20} allItem={ allItem } />
                </div>
            </Provider>
        )
    }
}

export default DataList;

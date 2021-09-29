import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';

import { createType, startEditType } from '../actions';


/**
 * 类型编辑触发组件
 * @props
 * {
 *     type: {String} - 类型参数 create/创建 edit/编辑
 *     dataSource: { Object } - 当前类型的数据
 * }
*/

class TypeEdit extends Component {
    // 生成触发编辑弹窗的子组件
    generateTrigger() {
        const { type } = this.props;
        let component = null;

        if (type === 'create') {
            component = <Button type="primary" onClick={this.createType.bind(this)}>新增类型</Button>;
        } else if (type === 'edit') {
            component = <a href="#" onClick={e => { this.editType(e) }}>编辑</a>
        }

        return component;
    }

    // 新增类型
    createType() {
        const { dispatch } = this.props;

        dispatch(createType());
    }

    // 编辑类型
    editType(e) {
        e.preventDefault();

        const { dispatch, dataSource } = this.props;

        // 每当开始编辑类型信息时即生成新的源数据
        dispatch(startEditType(JSON.parse(JSON.stringify(dataSource))));
    }

    render() {
        return this.generateTrigger();
    }
}

export default connect()(TypeEdit);

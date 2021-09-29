import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import { connect } from 'react-redux';

import { changeTypeC, deleteTypeC } from '../actions';

/**
 * 二级分类组件
*/
class TypeC extends Component {
    // 更新三级分类
    updateTypeC(type, value) {
        const { dispatch, dataSource } = this.props;
        const params = {
            id: dataSource.id,
            _id: dataSource._id,
            parentId: dataSource.parent_id
        }

        if (type === 'delete') {
            // 删除
            dispatch(deleteTypeC(params));
        } else if (type === 'change') {
            // 更改名称
            params.value = value;
            dispatch(changeTypeC(params));
        }
    }

    render() {
        const { dataSource } = this.props;
        const { name } = dataSource;
        // console.log('typec ------');
        // console.dir(this.props);

        return (
            <div style={{float:'left',margin:8}}>
                <Input
                    placeholder="请输入三级分类名称"
                    style={{width:135}}
                    value={name}
                    onChange={e => { this.updateTypeC('change', e.target.value) }}
                />
                <Icon
                    type="close-circle-o"
                    style={{fontSize:15,cursor:'pointer',marginLeft:10,color:'#57c5f7'}}
                    onClick={ e => { this.updateTypeC('delete') }}
                />
            </div>
        )
    }
}

export default connect()(TypeC);

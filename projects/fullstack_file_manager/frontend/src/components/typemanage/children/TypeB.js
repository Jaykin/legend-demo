import React, { Component } from 'react';
import { Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';

import TypeC from './TypeC';

import { changeTypeB, deleteTypeB, createTypeC } from '../actions';


/**
 * 二级分类组件
*/
class TypeB extends Component {
    // 更新二级分类名称信息
    handleChange(value) {
        const { dispatch, dataSource } = this.props;

        dispatch(changeTypeB(dataSource.id, dataSource._id, value));
    }

    // 删除二级分类
    deleteTypeB() {
        const { dispatch, dataSource } = this.props;

        dispatch(deleteTypeB(dataSource.id, dataSource._id));
    }

    // 新增三级分类
    createTypeC(parentId, _parentId) {
        const { dispatch } = this.props;

        dispatch(createTypeC(parentId, _parentId));
    }

    render() {
        const { dataSource } = this.props;
        const { name, id } = dataSource;
        // console.log('%c typeB ------', 'color:red');
        // console.dir(this.props);

        return (
            <div style={{padding:'16px 0',borderBottom:'1px solid #e9e9e9'}}>
                <div>
                    <span style={{marginRight:20}}>二级分类</span>
                    <Input
                        placeholder="请输入二级分类名称"
                        style={{width:'40%'}}
                        value={name}
                        onChange={e => {this.handleChange(e.target.value)}}
                    />
                    <Icon
                        type="close-circle-o"
                        style={{fontSize:15,cursor:'pointer',marginLeft:10,color:'#57c5f7'}}
                        onClick={e => { this.deleteTypeB() }}
                    />
                    <Button type="primary" style={{marginLeft:120}} onClick={() => { this.createTypeC(id, dataSource._id) }}>+新增三级分类</Button>
                </div>
                {
                    (dataSource.children.length || '') && (
                        <div style={{position:'relative',padding:"16px 0px 0px 100px"}}>
                            <span style={{position:'absolute',top:20,left:30}}>三级分类</span>
                            <div className="clearfix">
                                {
                                    dataSource.children.map((item, index)=>(
                                        <TypeC dataSource={item} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect()(TypeB);

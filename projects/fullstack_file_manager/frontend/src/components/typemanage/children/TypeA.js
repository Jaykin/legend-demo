import React, { Component } from 'react';
import { Popconfirm, Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';

import TypeB from './TypeB';

import { changeTypeA, deleteType, createTypeB } from '../actions';

/**
 * 一级分类组件
*/
class TypeA extends Component {
    // 更新一级分类的信息
    handleChange(id, type, value) {
        const { dispatch } = this.props;

        dispatch(changeTypeA(id, type, value));
    }

    // 删除一级分类
    deleteTypeA(id) {
        const { dispatch } = this.props;

        dispatch(deleteType(id));
    }

    // 新增二级分类
    createTypeB() {
        const { dispatch } = this.props;

        dispatch(createTypeB());
    }

    render() {
        // console.log('%c typeA ==========', 'color:red');
        // console.dir(this.props);
        const { dataSource } = this.props;
        const { name, sequence, description, id } = dataSource;

        return (
            <div>
                <div style={{paddingBottom:16,borderBottom:'1px solid #e9e9e9'}}>
                    <div>
                        <span style={{marginRight:20}}>类型名称</span>
                        <Input
                            placeholder="请输入一级分类名称"
                            style={{width:'40%'}}
                            value={name}
                            onChange={e => {this.handleChange(id || '', 'name', e.target.value)}}
                        />
                        {
                            !id ? ''
                                :
                                <Popconfirm title="删除该一级分类之后，该分类之下的文件都会归类到“其他”分类中，请谨慎操作！"
                                    onConfirm={e => { this.deleteTypeA(id) }}
                                    okText="确定删除"
                                    cancelText="取消">
                                    <Icon type="close-circle-o" style={{fontSize:15,cursor:'pointer',marginLeft:10,color:'#57c5f7'}}/>
                                </Popconfirm>
                        }
                        <Button type="primary" style={{marginLeft:120}} onClick={this.createTypeB.bind(this)}>+新增二级分类</Button>
                    </div>
                    <div style={{paddingTop:16}}>
                        <span style={{marginRight:20}}>排序序号</span>
                        <Input
                            placeholder="请输入分类排序序号"
                            style={{width:'40%'}}
                            value={sequence}
                            onChange={e => {this.handleChange(id || '', 'sequence', e.target.value )}}
                        />
                    </div>
                    <div style={{paddingTop:16}}>
                        <span style={{marginRight:20}}>分类简介</span>
                        <Input type="textarea"
                            rows={4}
                            placeholder="请输入一级分类简介"
                            style={{width:'40%',verticalAlign:'top'}}
                            value={description}
                            onChange={e => {this.handleChange(id || '', 'description', e.target.value )}}
                        />
                    </div>
                </div>
                {
                    dataSource.children.map((item, index) => (
                        <TypeB dataSource={item} key={index} />
                    ))
                }
            </div>
        )
    }
}

export default connect()(TypeA);

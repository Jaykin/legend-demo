
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Popconfirm, Input, Button } from 'antd';
import { CreateSectionModal } from '../modal';

import {
    fetchSecData,
    editSection,
    cancelEditSection,
    saveSecDataAsync,
    sectionChanged,
    deleteSecAsync,
    createSection,
    cancelCreateSection,
    createSecAsync,
} from './actions';

/**
 * 样式对象
*/
const secWrapStyle = {
    position: 'relative'
}

const createBtnStyle = {
    position: 'absolute',
    top: -35,
    right: '25%',
    fontSize: 14
}


class EditableCell extends Component {
    constructor(props) {
        super(props);

        const { value, editable } = props;

        this.state = {
            value: value,
            editable: editable || false,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { editable, value } = this.state;
        const { status, onChange } = this.props;

        if (nextProps.editable !== editable) {
            this.setState({ editable: nextProps.editable });

            if (nextProps.editable) {
                this.cacheValue = value;
            }
        }
        if (nextProps.status && nextProps.status !== status) {
            if (nextProps.status === 'save') {
                // onChange(value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                onChange(this.cacheValue);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }

    handleChange(e) {
        const { value } = e.target;
        const { onChange } = this.props;

        this.setState({ value });
        onChange(value);
    }

    render() {
        const { value, editable } = this.state;
        return (<div>
            {
                editable ?
                    <div>
                        <Input
                            value={value}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    :
                    <div className="editable-row-text">
                        {value || ' '}
                    </div>
            }
        </div>);
    }
}

class EditableTable extends Component {
    componentWillMount() {
        this.fetchSecData(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh) {
            const { pager } = this.props;
            const page = pager.current;
            this.fetchSecData(page);
        }
    }

    /**
     * 生成columns
    */
    generateColumn() {
        const _this = this;
        const data = _this.props.list;
        const renderColumns = _this.renderColumns.bind(_this);

        return [{
            title: '索引',
            dataIndex: 'index',
            width: '8%',
            className:'ids-main-table-center',
            render: (text, record, index) => renderColumns(data, index, 'id', text),
        }, {
            title: '版块名称',
            dataIndex: 'name',
            width: '12%',
            className:'ids-main-table-center',
            render: (text, record, index) => renderColumns(data, index, 'name', text),
        }, {
            title: '简介',
            dataIndex: 'brief',
            width: '60%',
            className:'ids-main-table-center',
            render: (text, record, index) => renderColumns(data, index, 'brief', text),
        }, {
            title: '操作',
            dataIndex: 'operation',
            width:'20%',
            className:'ids-main-table-center',
            render: (text, record, index) => {
                if (record.id === 0) return <span></span>;

                const { editable } = data[index].name;

                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.saveSec(index)}>保存</a>
                                    <Popconfirm title="确定取消编辑？" onConfirm={() => { _this.cancelEdit(index) }}>
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                                :
                                <span>
                                    <a onClick={() => this.editSec(index)}>编辑</a>
                                    <Popconfirm title="删除该版块之后，该版块之下的文件都会归类到“其他”版块中，请谨慎操作!"
                                        onConfirm={() => this.deleteSec(index, record.id)}>
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                        }
                    </div>
                );
            },
        }];
    }

    /**
     * 渲染columns
    */
    renderColumns(data, index, key, text) {
        const _this = this;
        const { editable, status } = data[index][key];

        if (typeof editable === 'undefined') {
            return text;
        }

        return (
            <EditableCell
                editable={editable}
                value={text}
                onChange={value => _this.handleChange(key, index, value)}
                status={status}
                keyName={key}
                indexValue={index}
            />
        );
    }

    /**
     * 处理页码变化
    */
    handleTableChange(pagination) {
        this.fetchSecData(pagination.current);
    }

    /**
     * 获取版块数据
    */
    fetchSecData(page) {
        const { dispatch, pageSize } = this.props;
        const from = (page - 1) * pageSize;

        dispatch(fetchSecData({
            from: from,
            page_size: pageSize
        }, {
            current: page
        }));
    }

    /**
     * 编辑版块数据
    */
    editSec(index) {
        this.props.dispatch(editSection(index));
    }

    /**
     * 取消编辑
    */
    cancelEdit(index) {
        const { dispatch } = this.props;
        dispatch(cancelEditSection(index));
    }
    /**
     * 编辑版块信息onChange
    */
    handleChange(key, index, value) {
        const { dispatch } = this.props;
        dispatch(sectionChanged({ key, index, value }));
    }

    /**
     * 保存版块
     *
    */
    saveSec(index) {
        const { dispatch } = this.props;
        dispatch(saveSecDataAsync(index));
    }

    /**
     * 新增版块
    */
    createSec() {
        const { dispatch } = this.props;
        dispatch(createSection());
    }

    confirmCreateSec(data) {
        const { dispatch } = this.props;
        dispatch(createSecAsync(data));
    }

    cancelCreateSec() {
        const { dispatch } = this.props;
        dispatch(cancelCreateSection());
    }

    /**
     * 删除版块
    */
    deleteSec(index, id) {
        const { dispatch } = this.props;
        dispatch(deleteSecAsync(index, id));
    }

    render() {
        const { list, pager, isFetching, visible, isCreating } = this.props;
        const columns = this.generateColumn();
        const dataSource = list.map(item => {
            let obj = {};

            Object.keys(item).forEach(key => {
                obj[key] = (key === 'key') ? item[key] : item[key].value;
            });

            return obj;
        });

        return (
            <div style={secWrapStyle}>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pager}
                    style={{width:'50%', margin:'0 auto'}}
                    loading={isFetching}
                    onChange={this.handleTableChange.bind(this)}
                />
                <div style={createBtnStyle}>
                    <Button
                        type="primary"
                        onClick={() => { this.createSec() }}>
                        新增版块
                    </Button>
                </div>
                <CreateSectionModal
                    visible={visible}
                    isCreating={isCreating}
                    confirmCreateSec={this.confirmCreateSec.bind(this)}
                    cancelCreateSec={this.cancelCreateSec.bind(this)}
                />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state };
}

export default connect(mapStateToProps)(EditableTable);

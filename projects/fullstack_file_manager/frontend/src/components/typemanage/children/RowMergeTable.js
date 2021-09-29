import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Pagination } from 'antd';

import TypeEdit from './TypeEdit';

import callAPI from '../../_utils/api';
import { setRefresh } from '../actions';

// 样式对象
const createTypeStyle = {
    position: 'absolute',
    right: 20,
    top: -36,
    fontSize: 14
}
const pagerStyle = {
    position: 'absolute',
    right: 0,
    bottom: -45
}


/**
 * 类型管理表格组件
*/

class RowMergeTable extends Component {
    constructor(props) {
        super(props);

        const { pageSize } = props;

        this.state = {
            data: [],
            columns: [],
            loading: false,
            pagination: {
                showQuickJumper: true,
                current: 1,
                pageSize: pageSize,
                total: 0,
                onChange: this.handleTableChange.bind(this)
            }
        }

        // 缓存类型数据
        this.typeStore = [];
        // 记录typeA的索引
        this.typeAIndex = 0;
    }

    componentDidMount() {
        this.fetchTypeData(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh === true) {
            const { dispatch } = nextProps;

            this.refreshCurrentPage()
            dispatch(setRefresh(false));

            return false;
        }
    }

    // 处理页码变化
    handleTableChange(page) {
        this.fetchTypeData(page);
    }

    // 刷新当前页
    refreshCurrentPage() {
        const { current } = this.state.pagination;

        this.fetchTypeData(current);
    }

    // columns的渲染函数
    commonColFunc(typeNum, children) {
        const _this = this;

        return (value, row, index) => {
            let now = 0;
            let next = 0;
            const obj = {
                children: (children && (row.id === 0 ? <span></span> : <TypeEdit type="edit" dataSource={_this.typeStore[_this.typeAIndex]} />)) || value,
                props: {},
            };

            for (let m=0;m<typeNum.length;m++) {
                now = next;
                next = now + typeNum[m].A;
                if (index === now) {
                    obj.props.rowSpan = typeNum[m].A;
                    if (children) {
                        _this.typeAIndex++;
                        if (typeNum.length === _this.typeAIndex) {
                            _this.typeAIndex = 0;
                        }
                    }
                }
                if (index > now && index < next ) {
                    obj.props.rowSpan = 0;
                }
            }

            return obj;
        }
    }

    // 生成合并的表格行columns
    generateColumns(res, page) {
        const _this = this;
        let data = [];
        let typeNum = [];
        let typeData = res.list;    // 后台返回的类型数据
        const { pagination } = _this.state;
        const { pageSize } = _this.props;

        for (let i = 0, typeA = typeData; i < typeA.length; i++) {
            typeNum[i] = { A: 0, B: [] };

            for (let j = 0, typeB = typeA[i].children || []; (j < typeB.length || typeB.length === 0); j++) {
                for (let k = 0, typeC = typeB.length===0 ? [] : typeB[j].children; (k < typeC.length || typeC.length === 0); k++) {
                    typeNum[i].B[j] = typeC.length || 1;
                    data.push({
                        key: '' + i + j + k,
                        id: typeA[i].id,
                        sequence: typeA[i].sequence,
                        index: res.total - (page - 1) * pageSize - i,
                        typeA: typeA[i].name,
                        brief: typeA[i].description || '无',
                        typeB: typeB.length === 0 ? '无' : typeB[j].name,
                        typeC: typeC.length === 0 ? '无' : typeC[k].name
                    });

                    if (typeC.length === 0) break;
                }

                if (typeB.length === 0) break;
            }
        }

        typeNum.map((item)=>{
            item.A = item.B.reduce((a,b) => (a + b))
        });

        let typeBNum = [];
        typeNum.forEach((item)=>{
            for (let b = 0; b < item.B.length; b++) {
                typeBNum.push(item.B[b]);
            }
        });

        const columnFunc = this.commonColFunc(typeNum);
        const columns = [{
            title: '索引',
            dataIndex: 'index',
            className: 'ids-main-table-center',
            render: columnFunc,
            width: '6%'
        }, {
            title: '排序序号',
            dataIndex: 'sequence',
            className: 'ids-main-table-center',
            render: columnFunc,
            width:'6%'
        }, {
            title: '一级分类',
            dataIndex: 'typeA',
            className: 'ids-main-table-center',
            render: columnFunc,
            width: '18%'
        }, {
            title: '简介',
            dataIndex: 'brief',
            className: 'ids-main-table-center',
            render: columnFunc,
            width: '18%'
        }, {
            title: '二级分类',
            dataIndex: 'typeB',
            className: 'ids-main-table-center',
            width: '18%',
            render: (value, row, index) => {
                let now = 0;
                let next = 0;
                const obj = {
                    children: value,
                    props: {},
                };

                for (let b = 0; b < typeBNum.length; b++) {
                    now = next;
                    next = now + typeBNum[b];
                    if (index === now) {
                        obj.props.rowSpan = typeBNum[b];
                    }
                    if (index > now && index < next) {
                        obj.props.rowSpan = 0;
                    }
                }

                return obj;
            }
        }, {
            title: '三级分类',
            dataIndex: 'typeC',
            className:'ids-main-table-center',
            width:'18%',
        }, {
            title: '操作',
            dataIndex: 'action',
            className:'ids-main-table-center',
            width:'6%',
            render: this.commonColFunc(typeNum, true)
        }];

            // 更新分页数据
        const pager = pagination;

        pager.total = res.total;
        pager.showTotal = total => `共 ${total} 项`;
        pager.current = page;

        this.setState({
            data: data,
            columns: columns,
            pagination: pager
        });
    }

    /**
     * 获取类型数据
     * @param {Number} page - 需要加载的页码
    */
    fetchTypeData(page) {
        const _this = this;
        _this.setState({ loading: true });

        const { pageSize } = _this.props;
        const from = ((page || 1) - 1) * pageSize;

        const request = callAPI.get_type_a({
            data: { from: from, page_size: pageSize }
        });

        request.done(res => {
            _this.typeStore = res.data.list;
            _this.typeAIndex = 0;
            _this.generateColumns(res.data, page);
        });

        request.complete(() => {
            _this.setState({ loading: false });
        });
    }

    render() {
        const { columns, data, pagination, loading } = this.state;
        // console.log('render ===========');
        // console.dir(data);
        return (
            <div style={{position:'relative'}}>
                <div style={createTypeStyle}>
                    <TypeEdit type="create" dataSource={null}/>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    loading={loading}
                />
                <Pagination {...pagination} style={pagerStyle}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({ refresh: state.refresh });

export default connect(mapStateToProps)(RowMergeTable);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Popconfirm } from 'antd';

import { FormModal } from '../modal';

import callAPI from '../_utils/api';
import { SUCCESS } from '../_utils/errcode';
import { formatDate } from '../_utils/formatDate';
import { backDataMapToFormData } from '../_utils/formData'

const columns = [
    {
        title: '索引',
        dataIndex: 'file_index',
        className:'ids-main-table-center',
        width:'4%'
    }, {
        title: '文件名称',
        dataIndex: 'file_name',
        className:'ids-main-table-center',
        width:'9%'
    }, {
        title: '品牌/车系/车型',
        dataIndex: 'file_brand_info',
        className:'ids-main-table-center',
        width:'9%'
    }, {
        title: '所属版块',
        dataIndex: 'file_section_name',
        className:'ids-main-table-center',
        width:'6%'
    }, {
        title: '资料分类',
        dataIndex: 'file_type_info',
        className:'ids-main-table-center',
        width:'12%'
    }, {
        title: '排序序号',
        dataIndex: 'file_sequence',
        className:'ids-main-table-center',
        width:'4%'
    }, {
        title: '文件格式',
        dataIndex: 'file_fromat',
        className:'ids-main-table-center',
        width:'4%'
    }, {
        title: '是否公开',
        dataIndex: 'file_is_open',
        className:'ids-main-table-center',
        width:'4%'
    }, {
        title: '是否推荐',
        dataIndex: 'file_is_recommend',
        className:'ids-main-table-center',
        width:'4%'
    }, {
        title: '简介',
        dataIndex: 'file_brief',
        className:'ids-main-table-center',
        width:'10%'
    }, {
        title: '文件大小',
        dataIndex: 'file_size',
        className:'ids-main-table-center',
        width:'4%'
    }, {
        title: '上传时间',
        dataIndex: 'file_upload_time',
        className:'ids-main-table-center',
        width:'9%'
    }, {
        title: '操作',
        dataIndex: 'action',
        className:'ids-main-table-center',
        width:'9%',
        render: (text, record, index) => {
            return (
                <span>
                    <Popconfirm title="确认删除该文件吗？删除后不可恢复" onConfirm={()=>{ record.deleteFileFunc(record.file_id) }} okText="确认" cancelText="取消">
                        <a href="#">删除</a>
                    </Popconfirm>
                    <span className="ant-divider" />
                    <a href={callAPI.getServerHost() + record.file_download_url} target="_blank" >下载</a>
                    <span className="ant-divider" />
                    <FormModal fileInfo={ record.getInitFormData(record) } afterSubmit={ record.refreshCurrent } />
                </span>
            )
        }
    }
];

/**
 * @props
 * {
 *  pageSize: { Number } -- 分页大小
 *  allItem: {Object} --
 * }
*/

class FileList extends Component {
    constructor(props) {
        super(props);

        const { pageSize } = props;

        this.state = {
            data: [],
            pagination: {
                showQuickJumper: true,
                defaultCurrent: 1,
                // current: 1,
                pageSize: pageSize || 20,
                total: 0
            },
            loading: false
        };

        // 缓存请求对象
        this.request = null;
    }

    componentDidMount() {
        const search = window.location.search;
        const fileName = search ? decodeURIComponent(search.replace(/\?file_name=/, '')) : '';
        const args = fileName ? [1, { name: fileName }] : [1];

        this.fetchFileList.apply(this, args);
    }

    componentWillReceiveProps(nextProps) {
        const prevProps = this.props;

        if (prevProps.formData !== nextProps.formData) {
            this.fetchFileList(1, nextProps.formData);
        }
    }

    componentWillUnmount() {
        // 处理pending requests
        const request = this.request;

        if (request) {
            request.abort();
            this.requests = null;
        }
    }

    render() {
        const { data, pagination, loading } = this.state;

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={pagination}
                loading={loading}
                onChange={this.handleTableChange.bind(this)}
            />
        )
    }

    // 获取相应页码的文件列表
    fetchFileList(page, data) {
        this.setState({ loading: true });

        const { pageSize, allItem } = this.props;
        const { allItemId } = allItem;
        let formData = data || this.props.formData;
        const _this = this;

        // 简化formData
        for (let key in formData) {
            if (!formData[key] || (formData[key] === allItemId)) {
                delete formData[key];
            }
        }
        formData.page_size = pageSize;
        formData.from = (page - 1) * pageSize;

        // 获取文件信息
        const request = callAPI.get_file_list({
            data: formData,
        });
        this.request = request;

        request.done(res => {
            res.errcode === SUCCESS && _this.updateFilesData(res.data, page);
        }).complete(() => {
            _this.setState({ loading: false });
        })
    }

    // 刷新当前页
    refreshCurrent() {
        const current = this.state.pagination.current;

        this.fetchFileList(current);
    }

    // 构建渲染数据
    updateFilesData(data, page) {
        const { pageSize, allItem } = this.props;
        const { allItemDes } = allItem;
        const pagination = this.state.pagination;
        pagination.total = data.file_total;
        pagination.current = page;
        pagination.showTotal = total => `共 ${total} 项`;

        // 重构数据
        let ext = '';
        let size = 0;
        let dateStr = '';
        let filesData = data.files.map((item, index) => {
            ext = '.' + item.file_fromat;
            size = (item.file_size / 1024) | 0;
            dateStr = formatDate(new Date(item.file_upload_time));

            return {
                /**
                 * 后台 item 结构
                 *
                 //file_brand_name: item.file_brand_name,
                 //file_brand_id: item.file_brand_id,
                 //file_series_name: item.file_series_name,
                 //file_model_name: item.file_model_name,
                 //file_series_id: item.file_series_id,
                 //file_model_id: item.file_model_id,
                 //file_type_a_name: item.file_type_a_name,
                 //file_type_b_name: item.file_type_b_name,
                 //file_type_c_name: item.file_type_c_name,
                 //file_type_a_id: item.file_type_a_id,
                 //file_type_b_id: item.file_type_b_id,
                 //file_type_c_id: item.file_type_c_id,
                 //file_is_open: item.file_is_open,
                 //file_section_id: item.file_section_id,
                 //file_section_name: item.file_section_name,
                 //file_id: item.file_id,
                 //file_name: item.file_name,
                 //file_fromat: item.file_fromat,
                 //file_brief: item.file_brief,
                 //file_download_url: item.file_download_url
                 //file_size: item.file_size
                 //file_upload_time: item.file_upload_time
                 * */
                ...item,
                file_index: data.file_total - (page - 1) * pageSize - index,
                file_name: item.file_name.replace(new RegExp(ext, 'g'), ''),
                file_brand_info: (item.file_brand_name || allItemDes) + '-' + (item.file_series_name || allItemDes) + '-' + (item.file_model_name || allItemDes),
                file_type_info: item.file_type_a_id ? ((item.file_type_a_name || '其他') + '/' + (item.file_type_b_name || allItemDes) + '/' + (item.file_type_c_name || allItemDes)) : '其他',
                file_section_name: item.file_section_name || '其他',
                file_is_open: +item.file_is_open ? '是' : '否',
                file_is_open_bool: !!item.file_is_open,
                file_is_recommend: +item.file_is_recommend ? '是' : '否',
                file_is_recommend_bool: !!item.file_is_recommend,
                file_size: size < 1000 ? (size === 0 ? '<1' : size) + 'K' : ((size/1024) | 0) + 'M',
                file_upload_time: dateStr,
                key: item.file_id,

                // callback
                deleteFileFunc: this.deleteFile.bind(this),
                getInitFormData: this.getInitFormData,
                refreshCurrent: this.refreshCurrent.bind(this)
            }
        });

        // 更新视图
        this.setState({
            data: filesData,
            pagination: pagination
        });
    }

    // 处理页码变化
    handleTableChange(pagination) {
        const pager = this.state.pagination;

        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchFileList(pager.current);
    }

    // 文件操作:删除
    deleteFile(id) {
        this.setState({ loading: true });

        const _this = this;
        const { pagination } = this.state;
        const request = callAPI.del_file({
            data: { id },
            type: 'post'
        });

        request.done(() => {
            _this.fetchFileList(pagination.current);
        }).fail(() => {
            _this.setState({ loading: false });
        });
    }

    // 获取编辑文件属性的文件信息
    getInitFormData(originData) {
        return backDataMapToFormData(originData);
    }
}

const mapStateToProps = (state, ownProps) => ({
    formData: state.formData
});

export default connect(mapStateToProps)(FileList);

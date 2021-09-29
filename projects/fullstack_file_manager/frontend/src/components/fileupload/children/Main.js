import React, { Component } from 'react';
import { Table, Button, Badge, Input } from 'antd';
import { connect } from 'react-redux';

import callAPI from '../../_utils/api';
import message from '../../_utils/message';

import Uploader from './Uploader';
import UploadState from './UploadState';
import { SettingModal } from '../../modal';
import { changeUploadState, selectedRow, uploadBatchSetting } from '../actions';
import { SUCCESS } from '../../_utils/errcode';

import { backDataMapToFormData } from '../../_utils//formData';

import {
    FilenameInput,
    CarCascade,
    CategoryCascade,
    PublicSelector,
    RecommendSelector,
    SecSelector
} from '../../fields';

import './main.less';

// 文件上传
const columns = [
    {
        title: '索引',              // 列头显示文字
        dataIndex: 'index',
        className:'ids-main-table-center',
    }, {
        title: '文件名称',
        dataIndex: 'filename',
        className:'ids-main-table-center',
        width:200,
        render: (text, record, index) => {
            if (record.uploadState === 'ready') {
                const { filename, handleChange, fileId } = record;
                const props = {
                    filename, fileId, handleChange,
                    opts: { isFormItem: false }
                }

                return <FilenameInput {...props} />;
            } else {
                return <span>{record.filename}</span>
            }

        }
    }, {
        title: '品牌/车系/车型',
        dataIndex: 'brand',
        className:'ids-main-table-center',
        render: (text, record, index) => {
            const { brand, allItem } = record;

            if (record.uploadState === 'ready') {
                const { handleChange, fileId } = record;
                const props = {
                    brand, allItem, handleChange, fileId,
                    opts: { isFormItem: false },
                }

                return <CarCascade {...props} />;
            } else {
                const { data } = brand;
                const brandName = data.brand.length ? data.brand[0].list[0].brand_name : allItem.allItemDes;
                const lineName = data.line.length ? data.line[0].line : allItem.allItemDes;
                const modelName = data.model.length ? data.model[0].name : allItem.allItemDes;

                return <span>{brandName + '-' + lineName + '-' + modelName}</span>
            }

        }
    }, {
        title: '所属版块',
        dataIndex: 'sec',
        className:'ids-main-table-center',
        render:(text, record, index) => {
            const { sec } = record;

            if (record.uploadState === 'ready') {
                const { allItem, otherItem, handleChange, fileId } = record;
                const props = {
                    sec, allItem, handleChange, fileId, otherItem,
                    opts: { isFormItem: false }
                }

                return <SecSelector {...props} />;
            } else {
                return <span>{sec.initData.section_name}</span>
            }

        }
    }, {
        title: '资料分类',
        dataIndex: 'type',
        className:'ids-main-table-center',
        render: (text, record, index) => {
            const { type, allItem, otherItem } = record;

            if (record.uploadState === 'ready') {
                const { handleChange, fileId } = record;
                const props = {
                    type, allItem, handleChange, fileId, otherItem,
                    opts: { isFormItem: false }
                }

                return <CategoryCascade {...props} />;
            } else {
                const { data } = type;
                const typeAName = data.typeA.length ? data.typeA[0].name : allItem.allItemDes;
                const typeBName = data.typeB.length ? data.typeB[0].name : allItem.allItemDes;
                const typeCName = data.typeC.length ? data.typeC[0].name : allItem.allItemDes;

                return <span>{typeAName + '-' + typeBName + '-' + typeCName}</span>
            }

        }
    }, {
        title: '文件格式',
        dataIndex: 'format',
        className:'ids-main-table-center'
    }, {
        title: '排序序号',
        dataIndex: 'fileseq',
        className:'ids-main-table-center',
        width:80,
        render: (text, record, index) => {
            if (record.uploadState === 'ready') {
                const { fileseq, handleChange, fileId } = record;

                return (
                    <Input type="text" value={fileseq} placeholder="文件排序序号" onChange={e => { handleChange && handleChange({ fileseq: e.target.value, fileId: fileId, key: 'fileseq' }) }}/>
                )
            } else {
                return <span>{record.fileseq}</span>
            }
        }
    }, {
        title: '是否公开',
        dataIndex: 'isOpen',
        className:'ids-main-table-center',
        render:(text, record, index) => {
            const { isOpen } = record;

            if (record.uploadState === 'ready') {
                const { handleChange, fileId, allItem } = record;
                const props = {
                    isOpen, handleChange, fileId, allItem,
                    opts: { isFormItem: false }
                }

                return <PublicSelector {...props} />;
            } else {
                return <span>{isOpen.initData == '1' ? '是' : '否'}</span>
            }

        }
    }, {
        title: '是否推荐',
        dataIndex: 'isRecommend',
        className:'ids-main-table-center',
        render:(text, record, index) => {
            const { isRecommend } = record;

            if (record.uploadState === 'ready') {
                const { handleChange, fileId, allItem } = record;
                const props = {
                    isRecommend, handleChange, fileId, allItem,
                    opts: { isFormItem: false }
                }

                return <RecommendSelector {...props} />;
            } else {
                return <span>{isRecommend.initData == '1' ? '是' : '否'}</span>
            }

        }
    }, {
        title: '简介',
        dataIndex: 'filebrief',
        className:'ids-main-table-center',
        render:(text, record, index) => {
            const { filebrief, handleChange, fileId } = record;
            return (
                <Input
                    disabled={record.uploadState !== 'ready'}
                    type="textarea"
                    placeholder={record.uploadState === 'ready' ? "文件简介" : ''}
                    rows={2}
                    value={filebrief}
                    onChange={e => { handleChange && handleChange({ filebrief: e.target.value, fileId: fileId, key: 'filebrief' }); }}
                />
            )

        }
    }, {
        title: '文件大小',
        dataIndex: 'filesize',
        className:'ids-main-table-center'
    }, {
        title: '状态/操作',
        dataIndex: 'action',
        width:165,
        className:'ids-main-table-center',
        render: (text, record, index) => {
            const props = {
                uploadState: record.uploadState,
                uploadPercent: record.uploadPercent,
                uploadFile: record.uploadFile,
                cancelFile: record.cancelFile,
                fileId: record.fileId,
                fileName: record.filename
            }

            return <UploadState {...props}  />
        }
    }
];


class Main extends Component {
    // 生成分页
    genaratePagination() {
        return {
            showQuickJumper: true,
            defaultCurrent: 1,
            total: this.props.fileList.length,
            showTotal: total => `共 ${total} 项`,
            defaultPageSize: 2,
            onChange: (page) => {

            }
        }
    }

    // 生成表格行
    getRowSelection(srks) {
        const _this = this;

        return {
            onChange: selectedRowKeys => {
                this.props.dispatch(selectedRow(selectedRowKeys));
            },
            selectedRowKeys: srks,
            getCheckboxProps: (record) => {
                return { disabled: record.uploadState !== 'ready' }
            },
            selections: [{
                key: 'all-data',
                text: '全选所有',
                onSelect: () => { _this.selectAllFile() },
            }, {
                key: 'invert-all-data',
                text: '反选所有',
                onSelect: () => { _this.invertSelectAllFile() },
            }]
        }
    }

    // 全选所有
    selectAllFile() {
        const { dispatch, fileList } = this.props;
        let keys = fileList.map(item => item.file_id);

        dispatch(selectedRow(keys));
    }

    // 反选所有
    invertSelectAllFile() {
        const { dispatch, fileList, selectedRowKeys } = this.props;
        let keys = fileList.map(item => {
            if (selectedRowKeys.indexOf(item.file_id) < 0) {
                return item.file_id;
            }
        });

        dispatch(selectedRow(keys));
    }

    // 批量上传文件
    uploadFiles() {
        const _this = this;
        const { selectedRowKeys, fileList } = _this.props;

        fileList.forEach(item => {
            const fileId = item.file_id;

            selectedRowKeys.indexOf(fileId) > -1 && _this.validateFile(fileId);
        });
    }

    // 检验本地文件信息
    validateFileData(data) {
        const reg = /^\d{1,7}$/g;

        if (!data.file_name) {
            // 文件名称不能为空
            message.warning('文件名称不能为空！');
            return false;
        }

        if (!reg.test(data.file_sequence)) {
            // 检验排序序号格式
            message.warning('排序序号格式错误，应为1~7位数字！');
            return false;
        }

        return true;
    }

    /** 跟后台校验文件信息
     * @param {string} fileId -- 本地文件ID
     * @param {boolean} isUpload -- 是否直接上传，跳过文件是否重复检测
     * @returns {void}
     * */
    validateFile(fileId, isUpload) {
        const _this = this;
        const { fileList, dispatch } = _this.props;
        const itemData = fileList.find(item => item.file_id === fileId);
        const duplicateId = itemData.duplicate_id || 0;

        if (!_this.validateFileData(itemData)) return false;

        const fileData = {
            name: itemData.file_name,
            // file_name: itemData.file_name,
            duplicate_id: duplicateId,     // 对应errcode 3001
            sequence: itemData.file_sequence,
            description: itemData.file_brief,
            brand_id: itemData.file_brand_id,
            series_id: itemData.file_series_id,
            model_id: itemData.file_model_id,
            section_id: itemData.file_section_id,
            is_open: +itemData.file_is_open_bool,
            is_recommend: +itemData.file_is_recommend_bool,
            type_ids: (itemData.file_type_a_id || 0) + ',' + (itemData.file_type_b_id || 0) + ',' + (itemData.file_type_c_id || 0)
        }

        // 文件重复 --> 覆盖源文件
        if (isUpload) {
            _this.uploadFile(fileId, fileData);
            return;
        }

        // 检验文件是否重复
        callAPI.duplicate_file({
            data: {
                brand_id: fileData.brand_id || 0,
                series_id: fileData.series_id || 0,
                model_id: fileData.model_id || 0,
                section_id: fileData.section_id || 0,
                type_ids: fileData.type_ids,
                name: fileData.name,
                ext: itemData.file_fromat
            }
        }).done(res => {
            const type = +res.data.type;
            const status = {
                '3000': 'isDupName',        // 存在同名文件
                '3001': 'isDupType',        // 同分类/版块/车型下文件名重复
                '3005': 'isUploading'       // 文件正在上传中
            }

            if (type == 3000 || type == 3001 || type == 3005) {
                // 仅type为3001时duplicateId才有值，其他为0
                dispatch(changeUploadState({ status: status[type], fileId, duplicateId: res.data.duplicate_id || 0 }));
            } else if (res.errcode === SUCCESS) {
                _this.uploadFile(fileId, fileData);
            } else {
                dispatch(changeUploadState({ status: 'error', fileId }));
            }
        }).fail(err => {
            dispatch(changeUploadState({ status: 'error', fileId }));
            console.dir(err);
        });
    }

    // 上传文件
    uploadFile(fileId, fileData) {
        const uploader = this.refs.uploader;

        uploader.uploadFile(fileId, fileData);
    }

    // 取消上传文件
    cancelFile(fileId) {
        const uploader = this.refs.uploader;

        uploader.cancelFile(fileId);
    }

    // 生成dataSource
    getDataSource() {
        const { fileList } = this.props;
        const _this = this;

        return fileList.map(item => {
            let newItem = backDataMapToFormData(item);

            newItem.key = item.file_id;
            newItem.format = item.file_fromat;
            newItem.filesize = item.file_size;
            newItem.index = item.index;
            newItem.action = '';
            newItem.handleChange = item.handleChange;
            newItem.uploadFile = _this.validateFile.bind(_this);
            newItem.cancelFile = _this.cancelFile.bind(_this);
            newItem.uploadState = item.uploadState;
            newItem.uploadPercent = item.uploadPercent;

            return newItem;
        });
    }

    //
    getSelectedLen() {
        const { fileList, selectedRowKeys } = this.props;
        let length = 0;

        fileList.forEach(item => {
            if (selectedRowKeys.indexOf(item.file_id) > -1 && item.uploadState === 'ready') {
                length++;
            }
        });

        return length;
    }

    // 批量设置文件信息
    handleBatchSetting() {
        const isSelected = !!this.props.selectedRowKeys.length;

        if (isSelected) {
            this.settingModalCmp.changeShowTo('visible');
        } else {
            message.warn('请先选择要设置的文件！');
        }
    }

    handleBatchSettingConfirm(data) {
        const { dispatch } = this.props;

        dispatch(uploadBatchSetting(data));
    }

    render() {
        const rowSelection = this.getRowSelection(this.props.selectedRowKeys);
        const dataSource = this.getDataSource();
        const selectedLen = this.getSelectedLen();

        return (
            <div className="file-upload-wrap">
                <div className="file-upload-head">
                    <Button type="primary" className="file-upload-setting" onClick={() => { this.handleBatchSetting() }}>批量设置属性</Button>
                    <Uploader ref="uploader" dispatch={this.props.dispatch} />
                </div>

                <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={ this.genaratePagination() }
                />

                <div className="file-upload-badge-wrap">
                    <Badge count={selectedLen} className="file-upload-badge"/>
                    <Button type="primary" disabled={!selectedLen} onClick={this.uploadFiles.bind(this)}>上传选中文件</Button>
                </div>

                <SettingModal confirmFunc={this.handleBatchSettingConfirm.bind(this)} ref={(component) => { this.settingModalCmp = component }} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fileList: state.filelist,
    selectedRowKeys: state.selectedRowKeys
});

export default connect(mapStateToProps)(Main);


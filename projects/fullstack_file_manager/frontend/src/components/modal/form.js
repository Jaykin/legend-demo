
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

import { VerticalForm } from '../form';
import callAPI from '../_utils/api';
import { SUCCESS } from '../_utils/errcode';

/**
 * @props
 * {
 *  fileInfo: { Object } -- 需要编辑的文件信息
 *  afterSubmit: { Function } -- 修改成功后的回调函数
 * }
 *
*/

class FormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false
        }

        // VerticalForm组件实例的引用
        this.formCpt = null;
        // 异步请求
        this.request = null;
    }

    render() {
        const { visible, loading } = this.state;

        return (
            <div style={{display:'inline-block'}}>
                <a href="javascript:;" onClick={this.showModal.bind(this)}>
                    编辑属性
                </a>
                <Modal
                    width={600}
                    visible={visible}
                    title="编辑文件属性"
                    onOk={this.handleConfirm.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <Button key="back" type="ghost" onClick={this.handleCancel.bind(this)}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleConfirm.bind(this)}>确认</Button>
                    ]}
                >
                    <VerticalForm fileinfo={this.props.fileInfo} getChildComponent={this.getChildComponent.bind(this)} />
                </Modal>
            </div>
        );
    }

    _setState(vi, lo) {
        const visible = vi === null ? this.state.visible : vi;
        const loading = lo === null ? this.state.loading : lo;

        this.setState({ visible, loading });
    }

    // 获取子组件
    getChildComponent(component) {
        this.formCpt = component;
    }

    showModal() {
        const formCpt = this.formCpt;

        this._setState(true, null);

        formCpt && formCpt.resetFields();
    }

    /***/
    handleConfirm() {
        const _this = this;
        const formCpt = _this.formCpt;
        const formData = formCpt.handleSubmit();

        if (!formData) return;      // 无formData

        const { fileInfo } = _this.props;

        _this._setState(null, true);

        // 构建更新文件信息数据（不限传'',其他传0）
        const data = _this.mapFrontDataToBack(formData, fileInfo);

        const request = callAPI.update_file({ type: 'post', data });
        _this.request = request;

        request.done(res => {
            const isSuccess = res.errcode === SUCCESS;

            _this._setState(!isSuccess, false);
            isSuccess && _this.props.afterSubmit();
        });

        request.fail(() => {
            _this._setState(true, false);
        });
    }

    mapFrontDataToBack(formData, fileInfo) {
        const {
            brand,
            line,
            model,
            typeB,
            typeC
        } = formData;

        const { allItemId } = fileInfo.allItem;

        return {
            id: fileInfo.fileId,
            name: formData.filename,
            description: formData.file_brief,
            sequence: formData.file_sequence,
            brand_id: brand === allItemId ? '' : brand,
            series_id: line === allItemId ? '' : line,
            model_id: model === allItemId ? '' : model,
            section_id: formData.section,
            type_ids: formData.typeA + ',' + (typeB === allItemId ? 0 : typeB) + ',' + (typeC === allItemId ? 0 : typeC),
            is_open: formData.is_open,
            is_recommend: formData.is_recommend
        }
    }

    handleCancel() {
        const request = this.request;

        if(request) {
            request.abort();
            this.request = null;
        }

        this._setState(false, false);
    }
}


export default connect()(FormModal);


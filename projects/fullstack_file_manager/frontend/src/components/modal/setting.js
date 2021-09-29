import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import { VerticalForm } from '../form';
import { backDataMapToFormData } from '../_utils/formData'

class SettingModal extends Component {
    constructor(props) {
        super(props);

        this.state = { visible: false };
        this.fileinfo = this.genarateFileInfo();
    }

    changeShowTo(type) {
        // 需要重置表单数据，即清除组件的缓存
        !type && this.formCmp.resetFields();
        this.setState({ visible: type === 'visible' });
    }

    handleCancel() {
        this.changeShowTo();
    }

    handleOk() {
        const { confirmFunc } = this.props;
        const data = this.formCmp.handleSubmit();

        if (data) {
            this.changeShowTo();
            confirmFunc && confirmFunc(data);
        }
    }

    genarateFileInfo() {
        return backDataMapToFormData({
            file_id: 'test',
            file_brand_name: '不限',
            file_brand_id: 'all',
            file_series_name: '不限',
            file_model_name: '不限',
            file_series_id: 'all',
            file_model_id: 'all',
            file_type_a_name: '其他',
            file_type_b_name: '不限',
            file_type_c_name: '不限',
            file_type_a_id: 0,
            file_type_b_id: 'all',
            file_type_c_id: 'all',
            file_section_id: 0,
            file_section_name: '其他',
            file_brief: '',
            file_is_open_bool: true,
            file_is_recommend_bool: true,
            file_sequence: 1
        });
    }

    render() {
        const { visible } = this.state;

        return (
            <div style={{display:'inline-block'}}>
                <span></span>
                <Modal
                    width={500}
                    visible={visible}
                    title="批量设置文件属性"
                    onOk={() => {this.handleOk()}}
                    onCancel={() => {this.handleCancel()}}
                    footer={[
                        <Button key="back" type="ghost" onClick={() => {this.handleCancel()}}>取消</Button>,
                        <Button key="submit" type="primary" onClick={() => {this.handleOk()}}>确定</Button>
                    ]}
                >
                    <VerticalForm type="setting" fileinfo={this.fileinfo} getChildComponent={(component) => { this.formCmp = component }}/>
                </Modal>
            </div>
        );
    }
}

export default SettingModal;


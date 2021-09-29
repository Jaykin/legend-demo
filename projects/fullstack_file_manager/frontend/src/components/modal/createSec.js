import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import message from '../_utils/message';

/**
 * 创建版块弹窗
*/
class CreateSectionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secName: '',
            secBrief: ''
        }
    }

    initState() {
        this.setState({ secName: '', secBrief: '' });
    }

    handleComfirm() {
        const { secName, secBrief } = this.state;

        if (!/\S/g.test(secName)) {
            message.warn('版块名称不能为空！');
        } else {
            this.initState();
            this.props.confirmCreateSec({ secName, secBrief });
        }
    }

    handleCancel() {
        const { cancelCreateSec } = this.props;

        this.initState();
        cancelCreateSec();
    }

    handleChange(e) {
        const { value, id } = e.target;
        let newState = {};

        newState[id] = value;

        this.setState(Object.assign({}, this.state, newState));
    }

    render() {
        const { visible, isCreating } = this.props;
        const { secName, secBrief } = this.state;

        return (
            <Modal
                visible={visible}
                title="新增版块"
                // onOk={this.handleComfirm}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                    <Button key="cancel" type="ghost" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" loading={isCreating} onClick={this.handleComfirm.bind(this)}>确认</Button>
                ]}
            >
                <div>
                    版块名称：
                    <Input
                        id="secName"
                        placeholder="请输入版块名称"
                        style={{width: '60%'}}
                        onChange={this.handleChange.bind(this)}
                        value={secName}
                    />
                </div>
                <div style={{marginTop: 10}}>
                    版块简介：
                    <Input
                        id="secBrief"
                        type="textarea"
                        rows={4}
                        placeholder="请输入版块简介"
                        style={{width: '60%', verticalAlign: 'top'}}
                        onChange={this.handleChange.bind(this)}
                        value={secBrief}
                    />
                </div>
            </Modal>
        )
    }
}

export default CreateSectionModal;

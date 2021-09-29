import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Button } from 'antd';
import TypeA from './TypeA';

import { updateTypeData, cancelEditMain } from '../actions';


class TypeEditModal extends Component {
    /**
     * 确认修改
    */
    handleOk() {
        const { dispatch } = this.props;

        dispatch(updateTypeData());
    }

    /**
     * 取消修改
    */
    handleCancel() {
        const { dispatch, isUpdating } = this.props;

        // dispatch(toggleModal(false));
        dispatch(cancelEditMain(isUpdating));
    }

    render() {
        const { visible, curType, isUpdating } = this.props;

        return (
            <Modal
                width={750}
                visible={visible}
                title="编辑类型"
                onCancel={this.handleCancel.bind(this)}
                footer={[
                    <Button key="back" type="ghost" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" loading={isUpdating} onClick={this.handleOk.bind(this)}>确认</Button>
                ]}>

                <TypeA dataSource={curType} />
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    visible: state.visible,
    isUpdating: state.isUpdating,
    curType: state.curType,
});

export default connect(mapStateToProps)(TypeEditModal);

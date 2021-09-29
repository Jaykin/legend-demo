import React, { Component } from 'react';
import { Form, Input } from 'antd';

import message from '../_utils/message';
import { assign } from 'lodash';

import {
    PublicSelector,
    RecommendSelector,
    FilenameInput,
    SecSelector,
    CarCascade,
    CategoryCascade
} from '../fields';

const FormItem = Form.Item;

const FORM_STYLE = { marginBottom:20 };
const FILE_BRIEF_STYLE = {
    width:280,
    verticalAlign:'top'
}

/**
 * @props
 * {
 *  fileinfo: { Object } -- 文件信息
 *  getChildComponent：{ Function } -- 用于给父组件传回该组件实例
 * }
 *
*/

class VerticalForm extends Component {
    componentDidMount() {
        const { getChildComponent } = this.props;

        getChildComponent && getChildComponent(this);
    }

    render() {
        const isUploadBatchSetting = this.props.type === 'setting';
        const setExtraData = isUploadBatchSetting ? this.setExtraData.bind(this) : null;
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const { isOpen, isRecommend, filename, sec, brand, type, allItem, otherItem, filebrief, fileseq } = this.props.fileinfo;
        const psProps = { getFieldDecorator, isOpen };
        const rsProps = { getFieldDecorator, isRecommend };
        const fiProps = { getFieldDecorator, filename };
        const ssProps = { getFieldDecorator, sec, allItem, otherItem, setExtraData };
        const ccProps = { getFieldDecorator, brand, allItem, setFieldsValue, setExtraData };
        const cacProps = { getFieldDecorator, type, allItem, otherItem, setFieldsValue, setExtraData };

        return (
            <Form layout="inline" style={FORM_STYLE}>
                {
                    isUploadBatchSetting
                        ? <span>提示：设置批量属性后，待上传的文件都会有相同的属性（可修改）</span>
                        : <FilenameInput {...fiProps} opts={{ label: '文件名称', id: 'filename', isFormItem: true }} />
                }
                <br/>
                <CarCascade {...ccProps} opts={{ label: '相关车型', id: 'brand_line_model', isFormItem: true }} ref="carCascade" /><br/>
                <SecSelector {...ssProps} opts={{ label: '所属版块', id: 'section', isFormItem: true }} /><br/>
                <CategoryCascade {...cacProps} opts={{ label: '资料分类', id: 'typeA_typeB_typeC', isFormItem: true}} ref="categoryCascade"/><br/>
                <FormItem label="排序序号">
                    {
                        getFieldDecorator('file_sequence', {
                            initialValue: fileseq
                        })(
                            <Input type="text" size="small" placeholder="文件排序序号"/>
                        )
                    }
                </FormItem><br/>
                <PublicSelector {...psProps} opts={{ label: '是否公开', id: 'is_open', isFormItem: true }} /><br/>
                <RecommendSelector {...rsProps} opts={{ label: '是否推荐', id: 'is_recommend', isFormItem: true }} /><br/>
                <FormItem label="文件简介">
                    {
                        getFieldDecorator('file_brief', {
                            initialValue: filebrief
                        })(
                            <Input type="textarea" placeholder="文件简介" rows={6} style={FILE_BRIEF_STYLE}/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }

    resetFields() {
        // 重置表单数据
        this.props.form.resetFields();
        // cascade 组件中涉及一些交互 需要手动reset
        this.refs.carCascade.resetField();
        this.refs.categoryCascade.resetField();
    }

    /* 设置额外的数据（如车型名称）
    * 由于使用getFieldsValue在每个表单项中只能获取到value（原始数据）
    * 而上传文件时一些表单项需要获取内容，暂时使用该方法实现
    */
    setExtraData(key, value) {
        if (!this.extraData) {
            this.extraData = {};
        }

        this.extraData[key] = value;
    }

    handleSubmit() {
        const data = this.props.form.getFieldsValue();
        const reg01 = /\S/g;            // 非空字符
        const reg02 = /^\d{1,7}$/g;     // 1 ~ 7位整数

        if (!reg01.test(data.filename)) {
            // rule-01 filenam不能为空
            message.warn('文件名称不能为空！');

            return false;
        } else if (!reg02.test(data.file_sequence)) {
            // rule-02
            message.warn('文件排序序号格式错误，应为1 ~ 7位数字');

            return false;
        } else {
            if (this.props.type === 'setting') {
                return assign(data, this.extraData);
            } else {
                return data;
            }
        }
    }
}


export default Form.create()(VerticalForm);

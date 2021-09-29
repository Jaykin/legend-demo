
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'antd';

import {
    PublicSelector,
    RecommendSelector,
    ExtSelector,
    FilenameInput,
    SecSelector,
    CarCascade,
    CategoryCascade
} from '../fields';

import { DATALIST_SEARCH_FILES } from '../_utils/actionTypes';

const FormItem = Form.Item;

class HorizontalForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        const { allItemId } = this.props.allItem;
        const { dispatchSearchFiles } = this.props;
        const filterAllItem = d => d == allItemId ? '' : d;

        let formData = {
            'name': data.filename || '',
            'ext': filterAllItem(data.extention),
            'brand_id': filterAllItem(data.brand),
            'series_id': filterAllItem(data.line),
            'model_id': filterAllItem(data.model),
            'type_a_id': filterAllItem(data.typeA),
            'type_b_id': filterAllItem(data.typeB),
            'type_c_id': filterAllItem(data.typeC),
            'section_id': filterAllItem(data.section),
            'is_open': data.is_open,
            'is_recommend': data.is_recommend,
        };

        dispatchSearchFiles(formData);
    }
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const { isOpen, isRecommend, format, filename, sec, brand, type, allItem } = this.props;
        const psProps = { getFieldDecorator, isOpen };
        const rsProps = { getFieldDecorator, isRecommend };
        const esProps = { getFieldDecorator, format };
        const fiProps = { getFieldDecorator, filename };
        const ssProps = { getFieldDecorator, sec, allItem };
        const ccProps = { getFieldDecorator, brand, allItem, setFieldsValue };
        const cacProps = { getFieldDecorator, type, allItem, setFieldsValue };

        return (
            <Form layout="inline" onSubmit={(e) => {this.handleSubmit(e)}}>
                <CarCascade {...ccProps} opts={{ label: '品牌/车系/车型', id: 'brand_line_model', isFormItem: true }} />
                <SecSelector {...ssProps} opts={{ label: '所属版块', id: 'section', isFormItem: true }} />
                <CategoryCascade {...cacProps} opts={{ label: '资料分类', id: 'typeA_typeB_typeC', isFormItem: true}}/>
                <PublicSelector {...psProps} opts={{ label: '是否公开', id: 'is_open', isFormItem: true }} />
                <RecommendSelector {...rsProps} opts={{ label: '是否推荐', id: 'is_recommend', isFormItem: true }} />
                <ExtSelector {...esProps} opts={{ label: '文件格式', id: 'extention', isFormItem: true }} />
                <FilenameInput {...fiProps} opts={{ label: '文件名', id: 'filename', isFormItem: true }} />
                <FormItem>
                    <Button type="primary" size="small" htmlType="submit">搜索</Button>
                </FormItem>
            </Form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    const dispatchSearchFiles = (data) => {
        dispatch({
            type: DATALIST_SEARCH_FILES,
            data
        })
    }

    return { dispatchSearchFiles }
}

export default connect(null, mapDispatchToProps)(Form.create()(HorizontalForm));


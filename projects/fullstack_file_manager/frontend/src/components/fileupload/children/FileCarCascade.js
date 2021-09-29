import React, { Component } from 'react';
import { Form } from 'antd';

import { CarCascade } from '../../fields';

class FileCarCascade extends Component {
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const { brand, allItem } = this.props;
        const ccProps = { getFieldDecorator, brand, allItem, setFieldsValue };

        return (
            <Form layout="inline">
                <CarCascade {...ccProps} opts={{ label: '品牌/车系/车型', id: 'brand_line_model' }} />
            </Form>
        )
    }
}

export default Form.create()(FileCarCascade);

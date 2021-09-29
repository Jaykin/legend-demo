import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

// 用于生成是否为表单项的组件
export default function genarateHoc(options, props) {
    return WrappedComponent => {
        if (options.isFormItem) {
            return (
                <FormItem label={options.label || ''}>{
                    options.getFieldDecorator(options.fieldName, {
                        initialValue: options.initVal
                    })(<WrappedComponent {...props}>{options.children}</WrappedComponent>)
                }</FormItem>
            )
        } else {
            return <WrappedComponent {...props} value={options.initVal}>{options.children}</WrappedComponent>
        }
    }
}

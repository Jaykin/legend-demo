
import React from 'react';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const ExtSelector = ({ getFieldDecorator, format, opts }) => (
    <FormItem
        label={opts.label}
        dropdownMatchSelectWidth={false}>

        {getFieldDecorator(opts.id, {
            initialValue: format.init
        })(
            <Select size="small" dropdownMatchSelectWidth={false}>
                {
                    format.data.map((item, idx) => (
                        <Option value={item.value} key={idx}>{item.des}</Option>
                    ))
                }
            </Select>
        )}
    </FormItem>
)

export default ExtSelector;

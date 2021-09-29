import React from 'react';
import { Select } from 'antd';
import generateHoc from './_genarateHoc';

const Option = Select.Option;


const PublicSelector = (args) => {
    const { getFieldDecorator, isOpen, opts, handleChange, fileId, allItemId } = args;
    const props = {
        size: 'small',
        onSelect: value => {
            let data = { is_open: value == allItemId ? '' : value };

            if (fileId) {
                data.fileId = fileId;
                data.key = 'is_open';
            }

            handleChange && handleChange(data);
        }
    }

    if (!opts.isFormItem) { props.value = isOpen.initData }

    return generateHoc({
        label: opts.label,
        isFormItem: opts.isFormItem,
        fieldName: opts.id,
        initVal: isOpen.initData,
        getFieldDecorator,
        children: isOpen.data.map((item, idx) => (
            <Option value={item.id} key={idx}>{item.des}</Option>
        ))
    }, props)(Select);
};

export default PublicSelector;

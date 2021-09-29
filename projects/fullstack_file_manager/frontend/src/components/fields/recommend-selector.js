import React from 'react';
import { Select } from 'antd';
import generateHoc from './_genarateHoc';

const Option = Select.Option;

const RecommendSelector = (args) => {
    const { getFieldDecorator, isRecommend, fileId, opts, handleChange, allItemId } = args;
    const props = {
        size: 'small',
        onSelect: value => {
            let data = { is_recommend: value == allItemId ? '' : value };

            if (fileId) {
                data.fileId = fileId;
                data.key = 'is_recommend';
            }

            handleChange && handleChange(data);
        }
    }

    if (!opts.isFormItem) { props.value = isRecommend.initData }

    return generateHoc({
        label: opts.label,
        isFormItem: opts.isFormItem,
        fieldName: opts.id,
        initVal: isRecommend.initData,
        getFieldDecorator,
        children: isRecommend.data.map((item, idx) => (
            <Option value={item.id} key={idx}>{item.des}</Option>
        ))
    }, props)(Select);
}

export default RecommendSelector;

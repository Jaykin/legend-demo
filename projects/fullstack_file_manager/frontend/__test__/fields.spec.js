import React from 'react';
import { shallow } from 'enzyme';

import DataList from 'components/datalist';
import { HorizontalForm } from 'components/form';
import { FilenameInput } from 'components/fields';

/**
 * 测试点：
 * 1.0 测试组件正常渲染（查找是否存在node即可）
 * 2.0 测试组件行为（模拟dom事件及mock函数）
*/

const datalistWrapper = shallow(<DataList />);
const formWrapper = datalistWrapper.find(HorizontalForm);

describe('datalist:::搜索表单', () => {
    // -------- 1.0 测试表单是否正确渲染
    it('form rendered', () => {
        expect(formWrapper.exists()).toBe(true);
        console.log(formWrapper);
    });

    // -------- 2.0 测试能否正确获取各表单域的值
    it('get fields value for <FilenameInput />', () => {
        const filenameWrapper = formWrapper.find(FilenameInput);
        const targetVal = 'test filename';
        let expectVal = '';

        filenameWrapper.simulate('change', {
            type: 'change',
            value: targetVal
        });

        expectVal = formWrapper.first().prop('form').getFieldsValue().name;
        expect(expectVal).toBe(targetVal);
    });
});

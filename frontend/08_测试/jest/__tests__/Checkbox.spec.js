/**
 * Created by Administrator on 2017/2/6.
 */
import React from 'react';
import Checkbox from '../src/components/Checkbox';
import renderer from 'react-test-renderer';

import {shallow} from 'enzyme';

    // react-test-renderer
test('Checkbox changes the text after click', () => {
    const component = renderer.create(
        <Checkbox labelOn="On" labelOff="Off" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.children[0].props.onChange();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


    // enzyme
test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(
        <Checkbox labelOn="On" labelOff="Off" />
    );

    expect(checkbox.text()).toEqual('Off');

    checkbox.find('input').simulate('change');

    expect(checkbox.text()).toEqual('On');
});

/**
 * Created by Administrator on 2017/1/20.
 */
import React from 'react';
import Link from '../src/components/Link';
import renderer from 'react-test-renderer';


it('正确渲染', () => {
    const tree = renderer.create(
        <Link page="https://www.baidu.com">百度</Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('链接不设置地址', () => {
    const tree = renderer.create(
        <Link>百度</Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

it('properly escapes quotes', () => {
    const tree = renderer.create(
        <Link>{'"Facebook" \\\'is \\ \'awesome\''}</Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

// Snapshot Testing
test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <Link page="http://www.facebook.com">Facebook</Link>
    );
    let tree = component.toJSON();
    //console.log(component);
    //console.log(tree);
    expect(tree).toMatchSnapshot();     // 截获虚拟DOM？？
    /*tree结构
    * {
    *    type: 'a',
         props: {
             className: 'normal',
             href: 'http://www.facebook.com',
             onMouseEnter: [Function: bound _onMouseEnter],
             onMouseLeave: [Function: bound _onMouseLeave]
         },
         children: [ '百度一下会死啊！' ] }
    * */


    // 手动触发回调
    tree.props.onMouseEnter();
    // re-rendering(重新绘制)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // 手动触发回调
    tree.props.onMouseLeave();
    // re-rendering(重新绘制)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
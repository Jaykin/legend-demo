import React, { Component } from 'react';


export default function propsProxyFunc(WrappedComponent) {
    return class PropsProxy extends Component {
        constructor(props) {
            super(props);
            this.state = { name: 'hello' }
        }

        getWCInstance(WrappedComponentInstance) {
            // 在WC组件挂载后立即执行
            console.log('现在的位置是在 PropsProxy 组件！');
            console.dir(WrappedComponentInstance);
        }

        onNameChange(event) {
            this.setState({
                name: event.target.value
            })
        }

        render() {
            // 01 操作props
            let { name, age, sex } = this.props;
            name = 'vivian';
            age = 16;
            sex = 'women';
            const wcProps = { name, age, sex };

            //return <WrappedComponent { ...wcProps } />

            // 02 通过ref访问WC组件实例
            //return <WrappedComponent { ...wcProps } ref={this.getWCInstance} />

            // 03 提取状态
            const newProps = {
                nameField: {
                    value: this.state.name,
                    onChange: this.onNameChange.bind(this)
                }
            }

            //return <WrappedComponent { ...wcProps } {...newProps} />

            // 04 用其他元素包裹WC
            return (
                <div style={{display: 'block'}}>
                    <WrappedComponent { ...wcProps } {...newProps} />
                </div>
            )
        }
    }
}
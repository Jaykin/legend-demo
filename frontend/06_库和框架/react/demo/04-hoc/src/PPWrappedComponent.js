
import React, { Component } from 'react';
import propsProxyFunc from './propsProxyFunc';

class TestComponent extends Component {
    render() {
        const { name, age, sex } = this.props;

        return (
            <div>
                <p>name: { name }</p>
                <p>age: { age }</p>
                <p>sex: { sex }</p>
                <input type="text" name="name" {...this.props.nameField}/>
            </div>
        )
    }
}

export default propsProxyFunc(TestComponent)
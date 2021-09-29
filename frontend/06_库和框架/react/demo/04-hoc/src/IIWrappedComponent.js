
import React, { Component } from 'react';
import iiHocFunc from './iiHocFunc';

class IIWrappedComponent extends Component {
    constructor() {
        super();
        this.type = 'Wrapped Component';
    }

    getType() {
        return this.type;
    }

    render() {
        const name = 'jay';
        const age = '18';
        const sex = 'man';

        return (
            <div>
                <input type="text"/>
                <p>name: { name }</p>
                <p>age: { age }</p>
                <p>sex: { sex }</p>
            </div>
        )
    }
}

export default iiHocFunc(IIWrappedComponent)

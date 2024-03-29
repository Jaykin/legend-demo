/**
 * Created by Administrator on 2017/2/6.
 */

import React from 'react';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked:false
        };

        // 手动绑定this
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({
            isChecked:!this.state.isChecked
        })
    }

    render() {
        return (
            <label>
                <input type="checkbox" checked={this.state.isChecked} onChange={this.onChange}/>
                {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
            </label>
        )
    }
}
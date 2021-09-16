/**
 * Created by Administrator on 2017/1/19.
 */
import React from 'react';

const STATUS = {
    NORMAL: 'normal',
    HOVERED: 'hovered',
};

class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            className:STATUS.NORMAL
        }

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
    }

    _onMouseEnter() {
        this.setState({className: STATUS.HOVERED});
    }

    _onMouseLeave() {
        this.setState({className: STATUS.NORMAL});
    }

    render() {
        return (
            <a
                className={this.state.className}
                href={this.props.page || '#'}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}>
                百度一下会死啊！
            </a>
        );
    }
}

export default Link;
/**
 * Created by Administrator on 2017/1/9.
 */
import React from 'react';

/*
* mixin用于在组件间共享某些功能(跨切面关注点)
* */

const SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

const TickTock = React.createClass({
    mixins: [SetIntervalMixin], // 引用 mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // 调用 mixin 的方法
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
        return (
            <p>
                React已经运行 {this.state.seconds} 秒！
            </p>
        );
    }
});

export default TickTock;
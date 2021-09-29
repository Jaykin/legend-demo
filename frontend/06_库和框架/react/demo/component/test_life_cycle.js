/**
 * Created by Administrator on 2016/12/15.
 */
import React from 'react';


const TestLifeCycle = React.createClass({
    getInitialState() {
        return {
            status:this.props.status
        }
    },
    componentWillMount() {
        console.log('1.0 WillMount=====================');
    },
    componentDidMount() {
        // 执行了render函数之后
        console.log('2.0 DidMount=====================');
    },
    componentWillReceiveProps(nextProps) {
        console.log('1.0 WillReceiveProps=====================');
        //this.setState({
        //    status:nextProps.status
        //});
        console.dir(this.props);
        console.dir(nextProps);
        console.log(this.props.status == nextProps.status);
        this.state.status = nextProps.status.color;
        this.forceUpdate();     // 调用此方法会强制调用render，不会调用shouldComponentUpdate(因为是强制更新)
    },
    shouldComponentUpdate(nextProps, nextState) {
        console.log('2.0 shouldComponentUpdate=====================');
        return true;
    },
    componentWillUpdate(nextProps, nextState) {
        console.log('3.0 WillUpdate=====================');
    },
    componentDidUpdate(prevProps, prevState) {
        // 执行了render函数之后
        console.log('4.0 DidUpdate=====================');
    },
    componentWillUnmount() {
        console.log('end WillUnmount(=====================');
    },
    render() {
        console.log('执行了组件render函数===============');
        return (
            <div style={{color:this.state.status}}>
                <p>这是he22llo</p>
            </div>
        )
    }
});

export default TestLifeCycle;
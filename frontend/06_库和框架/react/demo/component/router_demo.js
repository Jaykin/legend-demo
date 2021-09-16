/**
 * Created by Administrator on 2017/1/9.
 */
import React from 'react';
import { Router, Route, Link, IndexLink } from 'react-router';
    // 关于
const About = React.createClass({
    render() {
        return (
            <div>
                这是About
            </div>
        )
    }
});

    // 收信信箱
const Message = React.createClass({
    getInitialState() {
        return {
            message:'空'
        }
    },
    componentDidMount() {
        const id = this.props.params.id;
        console.dir(this.props);
        let message;
        switch(id) {
            case '1' : message = 'one';break;
            case '2' : message = 'two';break;
            case '3' : message = 'three';break;
            default : message = this.state.message;
        }
        this.setState({message:message});
    },
    render() {
        return <h3>这是Inbox 的 Message：{this.state.message}</h3>
    }
});
const Inbox = React.createClass({
    render() {
        return (
            <div>
                <h2>这是Inbox</h2>
                {this.props.children || '欢迎来到Inbox!'}
            </div>
        )
    }
});

    // 首页
const Home = React.createClass({
    render() {
        return (
            <div>
                这是Home，欢迎光临！
            </div>
        )
    }
});

    // 无react-router
const NoRouter = React.createClass({
    getInitialState() {
        return {
            route: window.location.hash.substr(1)
        }
    },
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    },
    render() {
        let Child
        switch (this.state.route) {
            case '/about': Child = About; break;
            case '/inbox': Child = Inbox; break;
            default:      Child = Home;
        }
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                </ul>
                <Child />
            </div>
        )
    }
});
    // react-router
const HaveRouter = React.createClass({
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <li><Link to="/ticktock">Mixin示例</Link></li>
                    <li><Link to="/hook">Hook示例</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
});



export { NoRouter, HaveRouter, Home, About, Inbox, Message };
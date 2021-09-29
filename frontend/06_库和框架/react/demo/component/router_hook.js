/**
 * Created by Administrator on 2017/1/9.
 */
/*
* 1、自定义Hook的dialog （Promise）
* 2、context实现组件跨层级通信
* */


import React from 'react';

const LifecycleMixin = {
    componentDidMount() {
        console.dir(this.props);
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
    }
}

function setAsyncRouteLeaveHook(router, route, hook) {
    let withinHook = false;
    let finalResult = undefined;
    let finalResultSet = false;
    router.setRouteLeaveHook(route, nextLocation => {
        console.dir(nextLocation);
        withinHook = true;
        if (!finalResultSet) {
            hook(nextLocation).then(result => {
                finalResult = result;
                finalResultSet = true;
                if (!withinHook && nextLocation) {
                    router.setRouteLeaveHook(route, null);
                    router.push(nextLocation);
                }
            })
        }
        let result = finalResultSet ? finalResult : false,
        withinHook = false,
        finalResult = undefined,
        finalResultSet = false;
        return result;
    })
}

const Hook = React.createClass({
    getInitialState() {
        return {
            isSaved:false
        }
    },
    getChildContext() {
        return {
            type:'context',
            print: () => {
                console.log('我是Hook组件！');
            }
        }
    },
    childContextTypes: {
        type: React.PropTypes.string,
        print: React.PropTypes.func
    },
    //mixins: [ LifecycleMixin ],
    routerWillLeave(nextLocation) {
        if (!this.state.isSaved) {
            return new Promise((resolve, reject) => {
                window.confirm('你离使用红包只差一步之遥，确定放弃吗？') && resolve(true);
            });
        }
    },
    componentDidMount() {
        //console.dir(this.props);
        setAsyncRouteLeaveHook(this.props.router, this.props.route, this.routerWillLeave);
    },
    render() {
        return (
            <div>
                <p>这是Hook （钩子）</p>
                <HookChild />
            </div>
        )
    }
});

const HookChild = React.createClass({
    contextTypes: {
        type: React.PropTypes.string,
        print: React.PropTypes.func
    },
    componentDidMount() {
        console.dir(this.context);
        this.context.print();
    },
    render() {
        return (
            <p>
                这是Hook子组件
            </p>
        )
    }
});

export default Hook;


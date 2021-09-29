/**
 * 状态机
 * 状态：当前状态名称、关联的下一个状态名称、切换到当前状态需要执行什么(完整生命周期)
 * 
 * 原理：定义好状态(数据结构)、定义状态机类(提供基础方法)，其包含多个状态
 * 解决问题：有限状态下的状态切换
*/

// 状态机类
class Machine {
    constructor(options) {
        this.state = options.initState;
        this.states = options.states;
        this.states[this.state].execute(options.initData);
    }

    // 往状态机输入
    input(action, data) {
        const stateObj = this.states[this.state];
        const nextState = stateObj[action] || '';

        if (nextState) {
            this.state = nextState;
            this.states[nextState].execute(data);
        }

        return this;
    }   

    // 增加状态
    addState(state) {

    }

    // 删除状态
    removeState(name) {

    }
}

// 状态类
class State {
    constructor(options) {
        this.name = '';     // 状态名称
        
    }

    // 状态生命周期 - 切换到当前状态时
    onCurrent() {

    }

    // 状态生命周期 - 切换到下一状态前
    onNext() {

    }
}

// 创建Machine实例
const machine = new Machine({
    initState: 'initial',
    initData: { init: true },
    states: {
        initial: {
            fetch: 'request',
            execute(data) {
                console.log('--------------state of initial');
                console.dir(data);
            }
        },

        request: {
            success: 'success',
            fail: 'fail',
            execute(data) {
                console.log('------------------state of request');
                console.dir(data);
            }
        },

        success: {
            execute(data) {
                console.log('-------------------state of success');
                console.dir(data);
            }
        },

        fail: {
            execute(data) {
                console.log('-------------------state of fail');
                console.dir(data);
            }
        }
    }
});

setTimeout(() => {
    machine.input('fetch', { fetch: true }).input('success', { success: true });
    console.log(machine);
}, 1000)
const StateMachine = require('./javascript-state-machine/app');

const fsm = new StateMachine({
    // 初始状态 - 关
    init: 'off',
    // 状态切换函数及规则
    transitions: [
        { name: 'weakLight', from: 'off', to: 'weak' },         // 关 -> 弱光
        { name: 'strongLight', from: 'weak', to: 'strong' },    // 弱光 -> 强光
        { name: 'offLight', from: 'strong', to: 'off' },        // 强光 -> 关
    ],
    // 状态切换的生命周期函数、或者自定义方法，注入到 fsm 实例中
    methods: {
        // 自定义方法
        sayHello() {
            console.log('Hello');
        },
        // 生命周期函数
        onTransition() {
            //  fired during any transition
            const lifecycle = arguments[0];
            console.log(`onTransition::${lifecycle.transition},from ${lifecycle.from} to ${lifecycle.to}`);
        }
    },
    // 往 fsm 实例注入数据属性
    data: {
        color: 'red',
    },
});

// 监听生命周期
fsm.observe({
    onWeak() {
        console.log('变成弱光');
    },
    onStrong() {
        console.log('变成强光');
    },
    onOff() {
        console.log('关灯');
    }
});

fsm.weakLight();
fsm.strongLight();
fsm.offLight();
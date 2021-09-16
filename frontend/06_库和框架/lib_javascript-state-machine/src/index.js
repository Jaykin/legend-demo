/**
 * javascript-state-machine
*/
const StateMachine = require('javascript-state-machine');

// 01 创建状态机
const fsm = new StateMachine({
    // 初始状态
    init: 'solid',
    // 转换对象
    transitions: [
        { name: 'melt', from: 'solid',  to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: 'liquid', to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' }
    ],
    // 转换过程的生命周期函数
    methods: {
        onMelt: function() { console.log('I melted') },
        onFreeze: function() { console.log('I froze') },
        onVaporize: function() { console.log('I vaporized') },
        onCondense: function() { console.log('I condensed') }
    }
});
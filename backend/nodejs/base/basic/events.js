// 事件驱动

const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.on('testEvent', (param1, param2) => {
    console.log('1. 触发了 testEvent 事件', param1, param2);
});
emitter.emit('testEvent', 'param1', 'param2');


// error 事件
// emitter.on(EventEmitter.errorMonitor, (err) => {
//     console.log(111);
// });
// emitter.on('error', (err) => {
//     console.log('2. 111');
// });
// emitter.emit('error', new Error('Has Error!'));


// 捕捉 reject(实验性)
// const emitter02 = new EventEmitter({ captureRejections: true });
// emitter02.on('something', async () => {
//     return new Promise((resolve, reject) => {
//         reject('qww');
//     });
// });
// emitter02.on('error', console.log);
// emitter02.emit('something');
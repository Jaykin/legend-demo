/**
 * 异步组合任务
 * 支持：error-first callbacks, streams, promises, event emitters, child processes, observables.
 * 1、callback 通过调用 cb 来通知 gulp 任务结束
 * 2、返回异步对象则根据 error 或 success 状态来通知 gulp   
*/
const { series ,src, dest } = require('gulp');
const { EventEmitter } = require('events');
const { exec } = require('child_process');

// return stream
function streamTask() {
    console.log('streamTask');
    return src('*.js')
        .pipe(dest('dist'));
}

// return promise
function promiseTask() {
    console.log('promiseTask');
    return Promise.resolve('resolved');
}

async function asyncAwaitTask() {
    console.log('asyncAwaitTask');
    await Promise.resolve('resolved');
}

// return event emitter
function eventEmitterTask() {
    console.log('eventEmitterTask');
    const emitter = new EventEmitter();

    setTimeout(() => emitter.emit('finish'), 250);
    return emitter;
}

// return child process
function childProcessTask() {
    console.log('childProcessTask');
    return exec('date');
}

// return observable

// error-first callback
function callbackTask(cb) {
    console.log('callbackTask');
    // success
    cb();
    // fail
    // cb(new Error('Fail'));
}

module.exports = {
    streamTask,
    promiseTask,
    asyncAwaitTask,
    eventEmitterTask,
    childProcessTask,
    callbackTask,
    default: series(promiseTask, eventEmitterTask),
}
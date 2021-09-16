/**
 * 监听文件更新
 * 1、可设置监听的事件
 * 2、watch 执行时默认不会开始执行任务，需要等到文件变化后才执行，可以进行配置
 * 3、watch 默认当前执行的任务不会同时再执行，需要排队等待
 * 4、watch 默认 200ms 之后才会执行任务，避免太多文件的修改导致多次触发 watch
*/
const { watch, series } = require('gulp');

function clean(cb) {
    cb();
}

function javascript(cb) {
    cb();
}

function css(cb) {
    cb();
}

// 1、设置监听事件，默认监听 created/changed/deleted
// 'add', 'addDir', 'change', 'unlink', 'unlinkDir', 'ready', 'error', 'all'
function watchAllEventsTask() {
    watch('demo/**/*.js', {
        events: 'all',
    }, series(clean, javascript));
}

// 2、初始化执行监听任务
function watchInitTask() {
    watch('demo/**/*.js', {
        ignoreInitial: false,
    }, series(clean, javascript));
}

// 3、禁用 queue
function watchAndUnQueue() {
    watch('demo/**/*.js', {
        queue: false,
    }, series(clean, javascript));
}

// 4、指定 delay 时间
function watchAndSetDelay() {
    watch('demo/**/*.js', {
        delay: 500,         // ms
    }, series(clean, javascript));
}

// 5、watcher 实例
const watcher = watch('demo/**/*.js');
watcher.on('change', () => {});
watcher.close();

module.exports = {
    watchAllEventsTask,
    watchAndInitTask,
    watchAndUnQueue,
}

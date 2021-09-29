/**
 * 任务创建
 * 
 * public task：gulpfile.js 输出的可以供 gulp 命令执行
 * private task：仅供内部使用
*/

const { series, parallel, task, lastRun } = require('gulp');

// 1、gulp.task([taskName], task func/compose task) 创建任务，已不再推荐
function namedFunc(cb) {
    cb();
}
task(namedFunc);

const unnamedFunc = (cb) => {
    cb();
}
unnamedFunc.displayName = 'unnamedFunc';
unnamedFunc.description = '测试任务的描述';
unnamedFunc.flags = { '-i': '命令行参数的作用描述' };
task('unnamedFunc', unnamedFunc);

    // 获取任务
task('unnamedFunc');

// 2、exports 创建任务、创建组合任务
function emptyTask(cb) {
    console.log('default task is empty!');
    cb();
}

function clean(cb) {
    console.log('clean');
    cb();
}

function js(cb) {
    console.log('js');
    cb();
}

function css(cb) {
    console.log('css');
    cb();
}

function transpile(cb) {
    console.log('transpile');
    cb();
}

function bundle(cb) {
    console.log('bundle');
    cb();
}

// 3、获取任务执行过程中的指定任务最后一次完成的时间点
function getLastRunTimestamp(cb) {
    console.log('lastRun', lastRun(clean));
    cb();
}

exports.build = series(
    clean,
    parallel(
        series(js, transpile, bundle),
        series(css, transpile, bundle),
    ),
    getLastRunTimestamp,
);
exports.default = emptyTask;

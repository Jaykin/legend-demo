/**
 * 命令行解析
*/
// 1、process.argv
const process = require('process');
function taskForProcessArgv(cb) {
    console.log('process.argv', process.argv);
    cb();
}

// 2、command args parser：yargs/minimist
const yargs = require('yargs');
const argv = yargs.argv;
function taskForYargs(cb) {
    console.log('yargs', argv);
    cb();
}

// 3、（不可用）使用插件为 task 注入参数：gulp-param
const gulp = require('gulp-param')(require('gulp'), process.argv);
const { task } = gulp;
function taskForGulpParam() {
    console.log(arguments);
}
task('taskForGulpParam', taskForGulpParam);

module.exports = {
    taskForProcessArgv,
    taskForYargs,
    taskForGulpParam,
}
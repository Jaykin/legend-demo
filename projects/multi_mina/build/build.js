const gulp = require('gulp');
const gulpWatch = require('gulp-watch');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const Compiler = require('./core/compiler');
const platforms = require('./core/constant').WEAPP_TYPES;    // 支持的平台列表
const sourcePath = 'fulishe'; // 当前项目的绝对路径
const emptyTask = (cb) => cb();
let buildTask = emptyTask;
const types = platforms.toString();

// 命令行参数解析
program
    .option('--type [typeNames]', `Build types ${types}`)
    .option('--watch', 'Watch mode')
    .option('--env [env]', 'Env type')
    .parse(process.argv);

const { type, watch, env } = program;
const isWatch = watch || env === 'develop';

if (typeof type !== 'string') {
    console.log(chalk.red(`ERROR: 请指定需要构建的平台 ${types}`));
    process.exit(1);
}

const currPlatforms = type.split('/');      // 当前需要构建的平台，如：wx/tt
// 判断是否为支持的平台
const unsupportPlatforms = currPlatforms.filter(platform => platforms.indexOf(platform) < 0);
if (unsupportPlatforms.length) {
    console.log(chalk.red(`ERROR: 包含未支持的平台 ${unsupportPlatforms.toString()}，仅支持 ${types}`));
    process.exit(1);
}

// 创建任务
let platformTasks = [];     // 构建任务列表
let compilers = [];         // 编译实例列表
currPlatforms.forEach((platform) => {
    // 必要的依赖检测
    if (!platform) {
        return;
    }

    const compileConfigPath = `./platforms/${platform}/compile.config.js`;
    const runtimeConfigPath = `./platforms/${platform}/runtime.config.js`;
    if (!fs.existsSync(path.join(`${process.cwd()}/build`, compileConfigPath))) {
        console.log(chalk.red(`ERROR ${platform}: 平台的编译配置为空，请先添加 ${compileConfigPath}`));
        return;
    }

    // 创建 compiler
    const arr = platforms.filter(item => item !== platform);
    arr.push(`!${platform}`);

    const compiler = new Compiler({
        // config: require(compileConfigPath),  // 编译配置
        sourcePath, // 当前项目的绝对路径
        distFolder: `dist/${platform}`, // 打包后的目录
        platform,   // 当前打包平台
        srcPlatform: 'wx',  // 源平台
    });

    compilers.push(compiler);
    platformTasks.push(compiler.runner);
});

if (platformTasks.length) {
    buildTask = isWatch ? gulp.series(gulp.parallel(...platformTasks), watching) : gulp.parallel(...platformTasks);
}

// 监测 ${sourcePath} 目录、build 的运行时配置文件
function watching(cb) {
    const watcher = gulpWatch([`${sourcePath}/**/*`, `!${sourcePath}/project.config.json`], function (vinyl) {
        console.log(`${chalk.blue(vinyl.event)}::${chalk.yellow(vinyl.path)}`);
        // 通知各平台 compiler 处理
        compilers.forEach((compiler) => {
            compiler.onSourceChanged(vinyl.event, vinyl.path, cb);
        });
    });

    return watcher;
}

module.exports = buildTask;
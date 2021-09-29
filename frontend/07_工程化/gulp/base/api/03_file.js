/**
 * 文件操作
 * 1、文件路径匹配使用 glob 语法
 * 2、文件在 gulp 是以 stream 的形式处理
*/

const { src, dest, symlink } = require('gulp');
const rename = require('gulp-rename');

function copy() {
    return src(['demo/src/src01.js', 'demo/src/src02.js'], {
        allowEmpty: true,
        // base: 'demo/src',
        root: '',
        dot: true,      // dot files
        ignore: [''],
        sourcemaps: true,
    }).pipe(dest(() => 'demo/dist'));
}

// 创建符号链接
function link() {
    return src('demo/src/src01.js')
        .pipe(symlink('demo/dist'));
}

// 往 stream 中增加文件
function addFileTask() {
    return src('demo/src/src01.js')
        .pipe(src('demo/src/src02.js'))
        .pipe(dest('demo/dist'));
}

// 分阶段输出
function outputInPhaseTask() {
    return src('demo/src/src01.js')
        .pipe(dest('demo/dist'))                // 不混淆
        .pipe(rename({ extname: '.min.js' }))   // 已混淆
        .pipe(dest('demo/dist'));
}

module.exports = {
    copy,
    link,
    addFileTask,
    outputInPhaseTask,
}
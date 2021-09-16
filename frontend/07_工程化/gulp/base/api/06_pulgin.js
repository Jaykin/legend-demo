/**
 * 插件开发，即对流的处理
*/

const { src, dest } = require('gulp');
const Vinyl = require('vinyl');
const { Transform } = require('stream');
const through2 = require('through2');

// 1、（无法使用，接收到的 chunk 类型错误）使用 node 的转换流
function inlinePlugin() {
    let file = null;

    return new Transform({
        objectMode: true,    // 需要转为对象模式，src() 传入的 chunk 为 object，transform 默认 chunk 为 buffer 或者 string
        transform(chunk, encoding, cb) {
            // chunk：Buffer、Stream、null
            let chunkStr = chunk.contents.toString();

            file = chunk;
            chunkStr += 'hello. gulp. first!';
            chunk.contents = Buffer.from(chunkStr);
            this.push(chunk);
            cb();
        },
        flush(cb) {
            cb();
        }
    });
}

// 2、利用流处理工具
function secondPlugin() {
    return through2.obj(function (chunk, encoding, cb) {
        let chunkStr = chunk.contents.toString();
        chunkStr += 'hello. gulp. second!';
        chunk.contents = Buffer.from(chunkStr);
        this.push(chunk);
        cb();
    }, function (cb) {
        cb();
    });
}

function task(cb) {
    return src('demo/src/*.js')
        .pipe(inlinePlugin())
        .pipe(secondPlugin())
        .pipe(dest('demo/dist'));
};

exports.default = task;
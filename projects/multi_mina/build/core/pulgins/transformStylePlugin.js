// 处理样式
const through = require('through2');
const _ = require('lodash');

module.exports = function transformStylePlugin(compiler) {
    const tarExts = compiler.config.adapters.ext;
    const extMap = _.invert(compiler.srcConfig.adapters.ext);

    return through.obj(function(file, encode, cb) {
        let contents = file.contents.toString();
        const reg = /(@import\s*["']\S+)(\.\S+)(["'];)/gi;

        contents = contents.replace(reg, ($1, $2, $3, $4) => {
            return $2 + tarExts[extMap[$3]] + $4;
        });

        file.contents = Buffer.from(contents);
        this.push(file);
        cb();
    });
};
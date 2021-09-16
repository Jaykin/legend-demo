// 修改文件扩展名
const rename = require('gulp-rename');
const _ = require('lodash');

module.exports = function transformExtPlugin(compiler, options = {}) {
    const tarExts = compiler.config.adapters.ext;
    const extMap = _.invert(compiler.srcConfig.adapters.ext);

    return rename((path) => {
        const srcExt = path.extname;
        path.extname = tarExts[extMap[srcExt]];
    });
};
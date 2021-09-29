const { getOptions } = require('loader-utils');

// 同步 loader
function syncLoader(content) {
    const options = getOptions(this);
    // 1.1、返回内容
    return `// 哈哈哈`;

    // 1.2、调用 callback
    // this.callback(null, content + `// hello`);
    return;
}
module.exports = syncLoader;

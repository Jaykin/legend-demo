const { getOptions } = require('loader-utils');

// 异步 loader
function asyncLoader(content) {
    const callback = this.async();
    let { repeat } = getOptions(this);

    setTimeout(() => {
        let result = content;
        while (repeat--) {
            result += content;
        }
        callback(null, result);
    });
}
module.exports = asyncLoader;
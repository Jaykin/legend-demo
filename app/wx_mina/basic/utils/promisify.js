
/**
 * 对wx的异步api进行promise化处理
 * @param {Function} func -- 小程序异步接口，如wx.apiName
*/
function promisify(func) {
    return function (opts = {}) {
        return new Promise((resolve, reject) => {
            opts.success = res => resolve(res);
            opts.fail = res => reject(res);

            func(opts);
        });
    }
}

module.exports = promisify;
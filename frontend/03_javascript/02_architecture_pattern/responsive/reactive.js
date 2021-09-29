const Watcher = require('./watcher');
const observe = require('./observer');
const { isObject } = require('./helpers/utils');

function reactive(value) {
    if (!isObject(value)) {
        return;
    }

    // 定义对象监听接口
    Object.defineProperty(value, '$watch', {
        enumerable: false,
        value: function (exp, cb, options) {
            const watcher = new Watcher(this, exp, cb, options);
    
            return function unwatchFn() {
                watcher.teardown();
            }
        }
    });

    // observe value
    observe(value);

    return value;
}

module.exports = reactive;

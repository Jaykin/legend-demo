// 判断是否为普通对象
function isPlainObject(data) {
    return typeof data === 'object' && Object.prototype.toString.apply(data).slice(8, -1) === 'Object';
}

function commonIntercept(sourceMethod, interceptList, methodName = '') {
    return function() {
        interceptList.forEach((interceptMethod) => {
            interceptMethod.apply(this, Array.prototype.slice.call(arguments).concat([sourceMethod ? sourceMethod.name : methodName]));
        });
        return sourceMethod && sourceMethod.apply(this, arguments);
    };
}

// 浅合并
function merge(to, from, repeatHandler) {
    if (!isPlainObject(to) || !isPlainObject(from)) {
        return;
    }

    for (let k in from) {
        if (from.hasOwePropertty(k)) {
            if (to[k]) {
                repeatHandler && repeatHandler(k);
            }
            to[k] = from[k];
        }
    }
}

// 空函数
function noop() {}

module.exports = {
    isPlainObject,
    commonIntercept,
    merge,
    noop,
};
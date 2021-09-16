/**
 * 深复制  基础实现篇
*/
function isFunction(tar) {
    return typeof tar === 'function'
}

function isMutipleType(tar) {
    var type = Object.prototype.toString.call(tar);

    return type === '[object Object]' || type === '[object Array]'
}

let cacheMap = new Map();

/**
 * 深/浅复制
 * @param {Any} origin - 源数据
 * @param {Object} options - 配置
 * options.deep {Boolean} - 是否使用深复制，默认false
 * option.ignoreFunction {Boolean} - 对函数处理的说明，true把函数当成简单类型复制，false不复制函数直接报错（默认）
 * */ 
function clone(origin, options) {
    var key, 
        value, 
        ret = {},
        isDeep = options && options.deep || false,
        isIgnoreFunc = options && options.ignoreFunction || false;

    if (isFunction(origin)) {
        // ignore
        if (isIgnoreFunc) return origin;

        // error
        throw new Error('Error:can not deep clone for this with Function');
    }
    // 简单数据类型 -- 直接返回
    if (!isMutipleType(origin)) return origin;

    // 复杂数据类型 -- 递归复制/直接复制
    for (key in origin) {
        value = origin[key];

        if (isDeep && isMutipleType(value)) {
            if (cacheMap.has(value)) {
                // 已拷贝，直接返回
                return cacheMap.get(value);
            } else {
                // 未拷贝，进行拷贝
                cacheMap.set(value, ret);
                ret[key] = clone(value, options);
            }
        } else {
            ret[key] = value;
        }
    }

    return ret;
}

var ori = {
    a: 1,
    b: {
        c: 3,
        d: [4, 5, { e: 6 }]
    },
    f: [7, 8]
}
ori.g = ori;
console.log('origin obj: ', ori);

console.time('clone');
var tar = clone(ori, { deep: true });
console.timeEnd('clone');

console.log('tar obj: ', tar);
// console.log(ori.b === tar.b);
// console.log(ori.f === tar.f);
// console.log(ori.b.d === tar.b.d);
// console.log(ori.b.d[2] === tar.b.d[2]);

// console.time('clone');
// var tar = JSON.parse(JSON.stringify(ori));
// console.timeEnd('clone');
// console.log(tar);
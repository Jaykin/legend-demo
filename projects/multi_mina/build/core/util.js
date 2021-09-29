// 判断是否为普通对象
function isObject(data) {
    return typeof data === 'object' && Object.prototype.toString.apply(data).slice(8, -1) === 'Object';
}

/** 深度合并对象
 * @param {Object} to -
 * @param {Object} from -
 * @returns {Object} to
*/
function deepAssign(to, from) {
    if (to === from) return to;
    if (!isObject(from) || !isObject(to)) return from;

    for (let key in from) {
        if (from.hasOwnProperty(key)) {
            let val = from[key];

            if (!to.hasOwnProperty(key) || !isObject(val)) {
                to[key] = val;
            } else {
                to[key] = deepAssign(to[key], from[key]);
            }
        }
    }

    return to;
}

// 复制 JSON 对象/数组
function cloneJsonObj(oldVal) {
    return JSON.parse(JSON.stringify(oldVal));
}

/**
 * 清除 require 的缓存
 * @param {String|Array} path - 模块引用路径 or 路径数组
 * @returns {undefined} - 无
 * */
function purgeCaches(path) {
    Array.isArray(path) ? path.forEach(p => _purgeCache(p)) : _purgeCache(path);
}

function _purgeCache(path) {
    let mod = require.resolve(path);
    const traverse = (mod) => {
        // 检查该模块的子模块并遍历它们
        mod.children.forEach((child) => {
            traverse(child);
        });

        // 清除缓存
        delete require.cache[mod.id];

        // 删除模块缓存的路径
        // Object.keys(module.constructor._pathCache).forEach((cacheKey) => {
        //     if (cacheKey.indexOf(path) >= 0) {
        //         delete module.constructor._pathCache[cacheKey];
        //     }
        // });
    };

    if (mod && (typeof (mod = require.cache[mod]) !== 'undefined')) {
        // 递归的检查结果
        traverse(mod);
    }
}

module.exports = {
    isObject,
    deepAssign,
    cloneJsonObj,
    purgeCaches,
};
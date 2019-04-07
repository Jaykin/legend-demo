/**
 * 工具函数
*/

/**
 * 删除数组中的某一项
*/
function remove(arr, item) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            return;
        }
    }
}

/** 
 * 简单路径解析
*/
function parsePath(path) {
    const segments = path.split('.');
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {
                return;
            }
    
            obj = obj[segments[i]];
        }
        return obj;
    }
}

// 是否为对象
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

// 
function traverse(val) {

}

module.exports = {
    remove,
    parsePath,
    isObject,
    traverse
}
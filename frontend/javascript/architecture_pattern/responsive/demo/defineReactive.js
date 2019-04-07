/**
 * 监听对象属性变化
 * 1、监听单个属性 obj.a || obj.b
 * 2、监听对象上的所有实例属性 obj.a && obj.b && obj.c && ...
 * 3、监听对象深层属性 obj.b.c.d
*/

// 1 简单版
function defineReactive(data, key, val, cb) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`获取属性 ${key} 的值为：`, val);
            return val;
        },
        set: function (newVal) {
            if (val !== newVal) {
                const oldVal = val;
                console.log(`更新属性 ${key} 的值为：`, newVal);
                val = newVal;
                cb(oldVal, newVal);
            }
        }
    })
}
    // 1.1 单个属性
// let obj = {};
// defineReactive(obj, 'a', 1);
// console.log(obj.a);
// obj.a = '33333';

    // 1.2 所有实例属性
function walk(obj, cb) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]], cb);
    }
}

    // 1.3 深层属性
function deepReactive(obj, path, val, cb) {
    let segments = path.join('.');
    let key = segments.pop();
    for (let i = 0; i < segments.length; i++) {
        if (!obj) return;
        obj = obj[segments[i]];
    }

    defineReactive(obj, key, val, cb);
}

// let obj = {
//     a: {
//         b: {
//             c: 1
//         }
//     }
// };
// deepReactive(obj, 'a.b.c', 1, function () {})

    // 1.3 监听数组项


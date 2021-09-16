/**
 * 响应式基本原理
 * 1、Object.defineProperty/Object.defineProperties
 *      - 支持拦截对象属性的 get、set
 * 2、Proxy
 *      - 支持更丰富的对象操作拦截
 *      - ES2015 新特性，注意兼容性
*/
let rawObj = {
    a: 1,
    b: null,
    c: 2
}

// ================== 1、Object.defineProperty ==================
Reflect.defineProperty(rawObj, 'c', {
    get() {
        console.log('get2');
        return 2;
    },
    configurable: false,
    // writable: false,
    enumerable: false
});

// ================== 2、Proxy ==================
const reactiveObj = new Proxy(rawObj, {
    // 获取属性
    get(target, propKey, receiver) {
        console.log('get：', target, propKey, receiver, rawObj === target);
        return Reflect.get(target, propKey, receiver);
    },

    // 新增/更新属性
    set(target, propKey, receiver) {
        console.log('set：', target, propKey, receiver);
        return Reflect.set(target, propKey, receiver);
    },

    // 删除属性
    deleteProperty(target, propKey) {
        console.log('deleteProperty：', target, propKey);
        // delete target[propKey];
        return false;
    }

    // 作为函数被调用时
    // apply(target, thisBinding, args) {
    //     console.log('apply：', target, thisBinding, args);
    //     return args[0];
    // },

    // 作为构造函数被调用时
    // construct() {
    //     console.log('construct：', target, args);
    //     return {value: args[1]};
    // },
});

reactiveObj.b = reactiveObj.c;
delete reactiveObj.c;
console.log('reactiveObj: ', reactiveObj, rawObj);
const Dep = require('./dep');
const { isObject } = require('./helpers/utils');
const { arrayMethods } = require('./array');

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        // 添加value被观察的标记，并禁止被遍历   
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false
        });

        if (Array.isArray(value)) {
            // 将数组的原始原型方法替换成被咱拦截后的（支持性不太好，可使用其他方法）
            Object.setPrototypeOf(value, arrayMethods);
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    // 对象
    walk(obj) {
        const keys = Object.keys(obj);
        const length = keys.length;
        for (let i = 0; i < length; i++) {
            defineReactive(obj, keys[i]);
        }
    }

    // 数组
    observeArray(items) {
        const length = items.length;
        for (let i = 0; i < length; i++) {
            // 无须设置setter/getter
            observe(items[i]);
        }
    }
}

// observe value 将value变成可观察的
function observe(value) {
    if (!isObject(value)) {
        return;
    }

    let ob = null;
    if (value.hasOwnProperty('__ob__')) {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    
    return ob;
}

function defineReactive(obj, key) {
    const dep = new Dep();  // 属性依赖实例

    // 兼容处理之前就已经定义的getter/setter
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor && descriptor.configurable === false) {
        return;
    }
    const getter = descriptor && descriptor.get;
    const setter = descriptor && descriptor.set;
    let val;

    if (!getter) {
        val = obj[key];
    }
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            const value = getter ? getter.call(obj) : val;

            // 收集依赖
            if (Dep.target) {
                dep.depend();
                // 子属性也需要收集父属性的依赖
                if (childOb) {
                    childOb.dep.depend();
                    // 数组的依赖收集
                    if (Array.isArray(val)) {
                        dependArray(val);
                    }
                }
            }
            return value;
        },
        set: function (newVal) {
            const value = getter ? getter.call(obj) : val;

            if (value !== newVal) {
                if (setter) {
                    setter.call(obj, newVal);
                } else {
                    val = newVal;
                }
                // 把新设置的值也转为可观察
                childOb = observe(newVal);
                // key值变化时通知依赖更新
                dep.notify();
            }
        }
    })
}

function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i];

        // 若为多维数组，继续递归监视
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
  }

module.exports = observe;